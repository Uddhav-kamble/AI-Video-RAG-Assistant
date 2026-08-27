export default function Footer() {
  const TECH_STACK = [
    'React', 'Vite', 'Flask', 'Whisper AI', 'Mistral AI',
    'LangChain', 'ChromaDB', 'Sarvam AI',
  ];

  return (
    <footer className="pt-16 pb-8 px-8 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] mt-auto">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Brand */}
          <div className="max-w-[320px]">
            <span className="font-[var(--font-display)] text-xl font-extrabold text-[var(--color-text-primary)]">
              ⚡ VideoRAG
            </span>
            <p className="text-[0.9rem] text-[var(--color-text-muted)] mt-2 leading-relaxed">
              AI-powered video analysis with Retrieval-Augmented Generation.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-[0.8rem] font-semibold uppercase tracking-[1px] text-[var(--color-text-muted)] mb-3">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <span
                  key={tech}
                  className="text-[0.75rem] font-medium px-3 py-1 bg-[rgba(124,58,237,0.06)] border border-[var(--color-border-subtle)] rounded-full text-[var(--color-text-secondary)] transition-all duration-150 hover:border-[var(--color-purple)] hover:text-[var(--color-purple-light)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-[var(--color-border-subtle)] text-center">
          <p className="text-[0.8rem] text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} AI Video RAG Assistant. Built for learning & exploration.
          </p>
        </div>
      </div>
    </footer>
  );
}
