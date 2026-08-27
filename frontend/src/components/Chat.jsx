import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const API_BASE = "http://localhost:5000/api";

export default function Chat({ sessionId }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !sessionId) return;

    const userMsg = input.trim();
    setInput('');
    setHistory((prev) => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, question: userMsg }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Chat failed');
      setHistory((prev) => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setHistory((prev) => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-0 overflow-hidden flex flex-col">
      <div className="flex items-center gap-4 p-6 border-b border-[var(--color-border-subtle)]">
        <span className="text-2xl">💬</span>
        <div>
          <h3 className="font-[var(--font-display)] text-[1.1rem] font-bold text-[var(--color-text-primary)] m-0">
            Chat with Your Video
          </h3>
          <p className="text-[0.8rem] text-[var(--color-text-muted)] mt-1">
            Ask anything about the transcript — powered by RAG
          </p>
        </div>
      </div>

      <div className="p-6 max-h-[420px] min-h-[200px] overflow-y-auto flex flex-col gap-4">
        {history.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <span className="text-[2.5rem] block mb-3">🤖</span>
            <p className="text-[0.9rem] mb-5">Ask any specific question about the video content.</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                'What was the main topic discussed?',
                'Were there any action items?',
                'Summarize the key takeaways',
              ].map((q) => (
                <button
                  key={q}
                  className="font-[var(--font-body)] text-[0.8rem] px-4 py-2 bg-[rgba(124,58,237,0.06)] border border-[var(--color-border-default)] rounded-full text-[var(--color-text-secondary)] cursor-pointer transition-all hover:bg-[rgba(124,58,237,0.12)] hover:border-[var(--color-purple)] hover:text-[var(--color-purple-light)]"
                  onClick={() => { setInput(q); }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          history.map((msg, idx) => (
            <div
              key={idx}
              className={`px-5 py-3 rounded-xl max-w-[82%] text-[0.9rem] leading-[1.6] animate-fade-in-up [animation-duration:0.25s] ${
                msg.role === 'user'
                  ? 'self-end bg-[rgba(124,58,237,0.15)] border border-[rgba(124,58,237,0.25)]'
                  : 'self-start bg-[rgba(6,214,160,0.06)] border border-[rgba(6,214,160,0.15)]'
              }`}
            >
              <div className="text-[0.72rem] font-semibold mb-1 opacity-70">
                {msg.role === 'user' ? '👤 You' : '🤖 Assistant'}
              </div>
              <div className="prose-result">
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>
            </div>
          ))
        )}
        {loading && (
          <div className="px-5 py-3 rounded-xl max-w-[82%] text-[0.9rem] leading-[1.6] animate-fade-in-up [animation-duration:0.25s] self-start bg-[rgba(6,214,160,0.06)] border border-[rgba(6,214,160,0.15)]">
            <div className="text-[0.72rem] font-semibold mb-1 opacity-70">🤖 Assistant</div>
            <div className="flex gap-1 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse-soft" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse-soft [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-cyan)] animate-pulse-soft [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex gap-3 p-5 border-t border-[var(--color-border-subtle)]">
        <input
          type="text"
          className="flex-1 bg-[rgba(14,17,30,0.6)] backdrop-blur-sm border border-[var(--color-border-default)] text-[var(--color-text-primary)] px-4 py-2.5 rounded-xl font-[var(--font-body)] text-[0.95rem] outline-none transition-all focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] placeholder-[var(--color-text-muted)] disabled:opacity-50"
          placeholder="Ask a question about the transcript…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="shrink-0 inline-flex items-center justify-center px-5 py-2.5 text-[0.95rem] font-semibold text-white rounded-xl bg-gradient-to-br from-[var(--color-purple)] to-[var(--color-violet)] shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
          disabled={loading || !input.trim()}
        >
          Send →
        </button>
      </form>
    </div>
  );
}
