import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Chat from '../components/Chat';

const API_BASE = "http://localhost:5000/api";

export default function AnalyzePage() {
  const [source, setSource] = useState('');
  const [language, setLanguage] = useState('english');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!source.trim()) return;

    setLoading(true);
    setResult(null);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, language }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Analysis failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] px-4 py-1.5 rounded-full mb-5">
            🚀 Analyze
          </span>
          <h1 className="font-[var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.15] mb-4 text-[var(--color-text-primary)]">
            Start Your <span className="gradient-text">Analysis</span>
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Paste a YouTube URL or provide a local file path to begin.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="glass-card max-w-[900px] mx-auto mb-8 p-8">
          <div className="flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full">
              <label className="block text-xs font-semibold uppercase tracking-[1px] text-[var(--color-text-muted)] mb-2" htmlFor="source-input">
                Media Source
              </label>
              <input
                id="source-input"
                type="text"
                className="w-full bg-[rgba(14,17,30,0.6)] backdrop-blur-sm border border-[var(--color-border-default)] text-[var(--color-text-primary)] px-4 py-3 rounded-xl font-[var(--font-body)] text-[0.95rem] outline-none transition-all focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] placeholder-[var(--color-text-muted)] disabled:opacity-50"
                placeholder="https://youtube.com/watch?v=... or C:\path\to\video.mp4"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="w-full md:w-[160px] shrink-0">
              <label className="block text-xs font-semibold uppercase tracking-[1px] text-[var(--color-text-muted)] mb-2" htmlFor="language-select">
                Language
              </label>
              <select
                id="language-select"
                className="w-full bg-[rgba(14,17,30,0.6)] backdrop-blur-sm border border-[var(--color-border-default)] text-[var(--color-text-primary)] pl-4 pr-10 py-3 rounded-xl font-[var(--font-body)] text-[0.95rem] outline-none transition-all focus:border-[var(--color-purple)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] appearance-none bg-no-repeat bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_fill=%22%236b6b90%22_d=%22M1.41_0L6_4.58_10.59_0_12_1.41l-6_6-6-6z%22/%3E%3C/svg%3E')] bg-[position:right_1rem_center] disabled:opacity-50"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={loading}
              >
                <option value="english">English</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto h-fit shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 text-[0.95rem] font-semibold text-white rounded-xl bg-gradient-to-br from-[var(--color-purple)] to-[var(--color-violet)] shadow-[0_4px_16px_rgba(124,58,237,0.3)] transition-all hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none"
            >
              {loading ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-[rgba(255,255,255,0.3)] rounded-full border-t-white animate-spin-slow" />
                  Processing…
                </>
              ) : (
                <>⚡ Analyze</>
              )}
            </button>
          </div>
        </form>

        {/* Error */}
        {error && (
          <div className="max-w-[900px] mx-auto mb-6 px-6 py-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-3 text-[0.9rem] animate-fade-in">
            <span>❌</span> {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="glass-card max-w-[900px] mx-auto mb-8 p-10 text-center text-[var(--color-text-secondary)] animate-fade-in">
            <div className="h-1 bg-[rgba(124,58,237,0.15)] rounded-full overflow-hidden w-full">
              <div className="h-full w-2/5 bg-gradient-to-r from-[var(--color-purple)] via-[var(--color-blue)] to-[var(--color-cyan)] rounded-full animate-shimmer bg-[length:200%_100%]" />
            </div>
            <p className="mt-4 text-[0.95rem]">Downloading audio, transcribing with AI, generating embeddings and insights…</p>
            <p className="text-[0.8rem] text-[var(--color-text-muted)] mt-1">This may take a few minutes depending on video length.</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="flex flex-col gap-6 mt-4 animate-fade-in-up">
            {/* Title */}
            <div className="glass-card text-center p-8">
              <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.1)] px-3 py-1.5 rounded-full mb-3">📌 Title</span>
              <h2 className="font-[var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)] mt-2">
                {result.title}
              </h2>
            </div>

            {/* Summary + Transcript */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass-card p-6">
                <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.1)] px-3 py-1.5 rounded-full mb-3">📋 Summary</span>
                <div className="text-[0.9rem] leading-[1.7] text-[var(--color-text-secondary)] prose-result">
                  <ReactMarkdown>{result.summary}</ReactMarkdown>
                </div>
              </div>
              <div className="glass-card p-6">
                <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.1)] px-3 py-1.5 rounded-full mb-3">📝 Full Transcript</span>
                <div className="max-h-[300px] overflow-y-auto whitespace-pre-wrap text-[0.85rem] leading-[1.6] text-[var(--color-text-muted)] pr-2">
                  {result.transcript}
                </div>
              </div>
            </div>

            {/* Action Items + Decisions + Questions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-card p-6">
                <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[var(--color-cyan)] bg-[rgba(6,214,160,0.1)] px-3 py-1.5 rounded-full mb-3">✅ Action Items</span>
                <div className="text-[0.9rem] leading-[1.7] text-[var(--color-text-secondary)] prose-result">
                  <ReactMarkdown>{result.action_items}</ReactMarkdown>
                </div>
              </div>
              <div className="glass-card p-6">
                <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[var(--color-blue)] bg-[rgba(59,130,246,0.1)] px-3 py-1.5 rounded-full mb-3">🔑 Key Decisions</span>
                <div className="text-[0.9rem] leading-[1.7] text-[var(--color-text-secondary)] prose-result">
                  <ReactMarkdown>{result.key_decisions}</ReactMarkdown>
                </div>
              </div>
              <div className="glass-card p-6">
                <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[#fbbf24] bg-[rgba(251,191,36,0.1)] px-3 py-1.5 rounded-full mb-3">❓ Open Questions</span>
                <div className="text-[0.9rem] leading-[1.7] text-[var(--color-text-secondary)] prose-result">
                  <ReactMarkdown>{result.open_questions}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* RAG Chat */}
            <Chat sessionId={result.session_id} />
          </div>
        )}
      </div>
    </main>
  );
}
