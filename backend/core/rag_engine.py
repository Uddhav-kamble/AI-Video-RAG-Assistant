import os
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough, RunnableLambda
from core.vector_store import build_vector_store, load_vector_store, get_retriever

def get_llm():
    return ChatMistralAI(
        model="mistral-small-latest",
        mistral_api_key=os.getenv("MISTRAL_API_KEY"),
        temperature=0.3,
    )

def format_docs(docs):
    return "\n\n".join([doc.page_content for doc in docs])

RAG_PROMPT = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are an expert meeting assistant. Answer the user's question 
        based ONLY on the meeting transcript context provided below.

        If the answer is not found in the context, say: 
        "I could not find this information in the meeting transcript."

        Always be concise and precise. If quoting someone, mention it clearly.

        Context from meeting transcript:
        {context}""",
    ),
    ("human", "{question}"),
])

def _make_chain(retriever):
    """Shared helper — wires retriever → prompt → LLM → parser."""
    llm = get_llm()
    return (
        {
            "context": retriever | RunnableLambda(format_docs),
            "question": RunnablePassthrough(),
        }
        | RAG_PROMPT
        | llm
        | StrOutputParser()
    )

def build_rag_chain(transcript: str, session_id: str):
    vector_store = build_vector_store(transcript, session_id=session_id)
    retriever = get_retriever(vector_store, k=4)
    return _make_chain(retriever)

def load_rag_chain(session_id: str):
    vector_store = load_vector_store(session_id=session_id)
    retriever = get_retriever(vector_store, k=4)
    return _make_chain(retriever)

def ask_question(rag_chain, question: str) -> str:
    return rag_chain.invoke(question)