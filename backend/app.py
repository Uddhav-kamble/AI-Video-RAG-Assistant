import uuid
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from utils.audio_processor import process_input
from core.transcriber import transcribe_all
from core.summarizer import summarize, generate_title
from core.extractor import extract_action_items, extract_key_decisions, extract_questions
from core.rag_engine import build_rag_chain, load_rag_chain, ask_question

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin requests for React frontend

# In-memory store for active RAG chains (keyed by session_id)
ACTIVE_CHAINS = {}

@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "ok", "msg": "backed running"}), 200

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "python_version": "3.14"}), 200

@app.route("/api/analyze", methods=["POST"])
def analyze():
    data = request.get_json() or {}
    source = data.get("source")
    language = data.get("language", "english")

    if not source:
        return jsonify({"error": "Missing 'source' parameter"}), 400

    try:
        session_id = f"session_{uuid.uuid4().hex[:8]}"

        # Pipeline execution
        chunks = process_input(source)
        transcript = transcribe_all(chunks, language)
        title = generate_title(transcript)
        summary = summarize(transcript)
        action_items = extract_action_items(transcript)
        decisions = extract_key_decisions(transcript)
        questions = extract_questions(transcript)

        # Build RAG chain for this session
        rag_chain = build_rag_chain(transcript, session_id=session_id)
        ACTIVE_CHAINS[session_id] = rag_chain

        return jsonify({
            "session_id": session_id,
            "title": title,
            "transcript": transcript,
            "summary": summary,
            "action_items": action_items,
            "key_decisions": decisions,
            "open_questions": questions
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    session_id = data.get("session_id")
    question = data.get("question")

    if not session_id or not question:
        return jsonify({"error": "Missing 'session_id' or 'question'"}), 400

    try:
        # Retrieve or recreate standard chain
        rag_chain = ACTIVE_CHAINS.get(session_id)
        if not rag_chain:
            rag_chain = load_rag_chain(session_id)
            ACTIVE_CHAINS[session_id] = rag_chain

        answer = ask_question(rag_chain, question)
        return jsonify({"answer": answer}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)