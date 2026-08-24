import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './App.css';

const API_BASE = "http://localhost:5000/api";

export default function App() {
  const [source, setSource] = useState('');
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);

  const chatBottomRef = useRef(null);

  // Auto-scroll chat box when new messages are added
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, chatLoading]);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!source.trim()) return;

    setLoading(true);
    setResult(null);
    setChatHistory([]);

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, language })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to analyze video');

      setResult(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !result?.session_id) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setChatHistory((prev) => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: result.session_id,
          question: userMessage
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to get answer');

      setChatHistory((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Controls */}
      <aside className="sidebar">
        <div className="logo-title">🎬 AI Video</div>
        <div className="logo-sub"> Assistant</div>
        <hr className="divider" />

        <form onSubmit={handleAnalyze} className="sidebar-form">
          <label className="input-label">Media Source</label>
          <input
            type="text"
            placeholder="YouTube URL or Local File Path"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            disabled={loading}
          />

          <label className="input-label">Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} disabled={loading}>
            <option value="english">English</option>
            <option value="hinglish">Hinglish</option>
          </select>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "⚡ Processing..." : "⚡ Analyse"}
          </button>
        </form>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header-section">
          <h1 className="hero-title">AI Video Assistant</h1>
          <p className="hero-sub">Transcribe · Summarise · Chat with your video</p>
        </header>

        {loading && (
          <div className="status-card">
            <span className="spinner"></span>
            <span>Processing audio, generating transcript and vector embeddings...</span>
          </div>
        )}

        {result && (
          <div className="results-wrapper">
            <div className="card title-card">
              <span className="card-badge">📌 Session Title</span>
              <h2>{result.title}</h2>
            </div>

            <div className="grid-2col">
              <div className="card">
                <span className="card-badge">📋 Summary</span>
                <div className="card-body">
                  <ReactMarkdown>{result.summary}</ReactMarkdown>
                </div>
              </div>

              <div className="card">
                <span className="card-badge">📝 Full Transcript</span>
                <div className="transcript-scroll">{result.transcript}</div>
              </div>
            </div>

            <div className="grid-3col">
              <div className="card">
                <span className="card-badge">✅ Action Items</span>
                <div className="card-body">
                  <ReactMarkdown>{result.action_items}</ReactMarkdown>
                </div>
              </div>
              <div className="card">
                <span className="card-badge">🔑 Key Decisions</span>
                <div className="card-body">
                  <ReactMarkdown>{result.key_decisions}</ReactMarkdown>
                </div>
              </div>
              <div className="card">
                <span className="card-badge">❓ Open Questions</span>
                <div className="card-body">
                  <ReactMarkdown>{result.open_questions}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* RAG Interactive Chat */}
            <section className="chat-section">
              <h3>💬 Chat with your Video</h3>
              <div className="chat-box">
                {chatHistory.length === 0 ? (
                  <p className="empty-chat">Ask any specific detail about the video transcript.</p>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div key={idx} className={`chat-bubble ${msg.role}`}>
                      <div className="chat-role">
                        {msg.role === 'user' ? 'You' : '🤖 Assistant'}
                      </div>
                      <div className="chat-content">
                        {msg.role === 'user' ? (
                          msg.content
                        ) : (
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {chatLoading && (
                  <div className="chat-bubble assistant">
                    <div className="chat-role">🤖 Assistant</div>
                    <div className="chat-content pulse">Thinking...</div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              <form onSubmit={handleSendMessage} className="chat-form">
                <input
                  type="text"
                  placeholder="Ask a question about the transcript..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={chatLoading}
                />
                <button type="submit" className="btn-primary" disabled={chatLoading}>
                  Send →
                </button>
              </form>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}