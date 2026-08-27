import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Chat from './Chat';
import './Analyzer.css';

const API_BASE = "http://localhost:5000/api";

export default function Analyzer() {
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
    <section id="analyze" className="analyzer">
      <div className="container">
        <div className="analyzer__header">
          <span className="section-badge">🚀 Analyze</span>
          <h2 className="section-title">
            Start Your <span className="gradient-text">Analysis</span>
          </h2>
          <p className="section-subtitle">
            Paste a YouTube URL or provide a local file path to begin.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleAnalyze} className="analyzer__form glass-card">
          <div className="analyzer__form-row">
            <div className="analyzer__input-group">
              <label className="analyzer__label" htmlFor="source-input">Media Source</label>
              <input
                id="source-input"
                type="text"
                className="input"
                placeholder="https://youtube.com/watch?v=... or C:\path\to\video.mp4"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="analyzer__select-group">
              <label className="analyzer__label" htmlFor="language-select">Language</label>
              <select
                id="language-select"
                className="select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={loading}
              >
                <option value="english">English</option>
                <option value="hinglish">Hinglish</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary analyzer__submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="analyzer__spinner" />
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
          <div className="analyzer__error animate-fade-in">
            <span>❌</span> {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="analyzer__loading glass-card animate-fade-in">
            <div className="analyzer__loading-bar">
              <div className="analyzer__loading-fill" />
            </div>
            <p>Downloading audio, transcribing with AI, generating embeddings and insights…</p>
            <p className="analyzer__loading-note">This may take a few minutes depending on video length.</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="analyzer__results animate-fade-in-up">
            {/* Title */}
            <div className="result-title glass-card">
              <span className="result-badge">📌 Title</span>
              <h2 className="result-title__text">{result.title}</h2>
            </div>

            {/* Summary + Transcript */}
            <div className="result-grid-2">
              <div className="glass-card">
                <span className="result-badge">📋 Summary</span>
                <div className="result-body">
                  <ReactMarkdown>{result.summary}</ReactMarkdown>
                </div>
              </div>
              <div className="glass-card">
                <span className="result-badge">📝 Full Transcript</span>
                <div className="result-transcript">{result.transcript}</div>
              </div>
            </div>

            {/* Action Items + Decisions + Questions */}
            <div className="result-grid-3">
              <div className="glass-card">
                <span className="result-badge result-badge--green">✅ Action Items</span>
                <div className="result-body">
                  <ReactMarkdown>{result.action_items}</ReactMarkdown>
                </div>
              </div>
              <div className="glass-card">
                <span className="result-badge result-badge--blue">🔑 Key Decisions</span>
                <div className="result-body">
                  <ReactMarkdown>{result.key_decisions}</ReactMarkdown>
                </div>
              </div>
              <div className="glass-card">
                <span className="result-badge result-badge--amber">❓ Open Questions</span>
                <div className="result-body">
                  <ReactMarkdown>{result.open_questions}</ReactMarkdown>
                </div>
              </div>
            </div>

            {/* RAG Chat */}
            <Chat sessionId={result.session_id} />
          </div>
        )}
      </div>
    </section>
  );
}
