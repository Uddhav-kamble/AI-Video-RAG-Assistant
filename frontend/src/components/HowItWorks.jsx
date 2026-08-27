export default function HowItWorks() {
  const STEPS = [
    {
      number: '01',
      icon: '🎬',
      title: 'Upload or Paste',
      description: 'Provide a YouTube URL or upload a local video/audio file. We support all major formats.',
    },
    {
      number: '02',
      icon: '🧠',
      title: 'AI Analysis',
      description: 'Our pipeline transcribes audio, generates summaries, extracts action items, decisions, and questions.',
    },
    {
      number: '03',
      icon: '💬',
      title: 'Chat with Your Video',
      description: 'Ask any question about the content. RAG retrieves relevant context and delivers precise answers.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 px-8">
      <div className="max-w-[1000px] mx-auto text-center mb-14">
        <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] px-4 py-1.5 rounded-full mb-5">
          ⚙️ Process
        </span>
        <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.15] mb-4 text-[var(--color-text-primary)]">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-lg text-[var(--color-text-secondary)] max-w-[600px] mx-auto leading-relaxed">
          Three simple steps to unlock the full potential of your video content.
        </p>
      </div>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {STEPS.map((step, i) => (
          <div
            key={step.number}
            className="glass-card relative text-center p-10 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <div className="font-[var(--font-display)] text-sm font-bold text-[var(--color-purple-light)] opacity-50 tracking-[2px] mb-5">
              {step.number}
            </div>
            <div
              className="text-4xl mb-5 inline-block animate-float"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              {step.icon}
            </div>
            <h3 className="font-[var(--font-display)] text-xl font-bold mb-3 text-[var(--color-text-primary)]">
              {step.title}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {step.description}
            </p>

            {/* Desktop Connector Line */}
            {i < STEPS.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-[var(--color-purple)] to-transparent -translate-y-1/2 z-10" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
