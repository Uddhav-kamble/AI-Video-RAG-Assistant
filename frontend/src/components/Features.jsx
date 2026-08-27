const FEATURES = [
  {
    icon: '🎙️',
    title: 'Smart Transcription',
    description: 'Powered by Whisper AI for English and Sarvam AI for Hinglish — get accurate transcripts from any video.',
    tag: 'whisper',
  },
  {
    icon: '📋',
    title: 'AI Summary',
    description: 'Map-reduce summarization splits long content and generates concise, professional bullet-point summaries.',
    tag: 'langchain',
  },
  {
    icon: '✅',
    title: 'Action Items',
    description: 'Automatically identifies tasks, assigns owners, and notes deadlines from meeting discussions.',
    tag: 'extraction',
  },
  {
    icon: '🔑',
    title: 'Key Decisions',
    description: 'Pinpoints every decision made during the video so nothing slips through the cracks.',
    tag: 'extraction',
  },
  {
    icon: '❓',
    title: 'Open Questions',
    description: 'Surfaces unresolved topics and follow-up items that need further attention or discussion.',
    tag: 'extraction',
  },
  {
    icon: '💬',
    title: 'RAG Chat',
    description: 'Ask any question about the video. ChromaDB vector retrieval ensures answers are grounded in the transcript.',
    tag: 'rag',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[1.5px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] px-4 py-1.5 rounded-full mb-5">
            ✨ Capabilities
          </span>
          <h2 className="font-[var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-extrabold leading-[1.15] mb-4 text-[var(--color-text-primary)]">
            Everything You Need to <span className="gradient-text">Understand</span> Any Video
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-[600px] mx-auto leading-relaxed">
            Six powerful AI-driven capabilities working together to give you complete insight into your video content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className="glass-card flex flex-col gap-3 p-8 animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="text-3xl w-14 h-14 flex items-center justify-center bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.15)] rounded-xl mb-1">
                {feat.icon}
              </div>
              <h3 className="font-[var(--font-display)] text-[1.1rem] font-bold text-[var(--color-text-primary)]">
                {feat.title}
              </h3>
              <p className="text-[0.9rem] text-[var(--color-text-secondary)] leading-relaxed flex-1">
                {feat.description}
              </p>
              <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[1px] text-[var(--color-cyan)] bg-[rgba(6,214,160,0.08)] border border-[rgba(6,214,160,0.15)] px-3 py-1 rounded-full w-fit">
                {feat.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
