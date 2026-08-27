import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-8 overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none -top-[10%] -left-[10%] bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,transparent_70%)] animate-float" />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none -bottom-[10%] -right-[10%] bg-[radial-gradient(circle,rgba(6,214,160,0.12)_0%,transparent_70%)] animate-float [animation-direction:reverse] [animation-duration:10s]" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[length:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_0%,transparent_100%)]" />

      <div className="relative z-10 text-center max-w-[800px]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[1.5px] text-[var(--color-purple-light)] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)] px-5 py-2 rounded-full mb-8 animate-fade-in-up">
          <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-cyan)] animate-pulse-soft" />
          Powered by RAG + Mistral AI
        </div>

        {/* Title */}
        <h1 className="font-[var(--font-display)] text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.1] mb-6 tracking-tight animate-fade-in-up [animation-delay:0.1s]">
          Transform Any Video Into
          <br />
          <span className="gradient-text">Actionable Intelligence</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-[var(--color-text-secondary)] max-w-[580px] mx-auto mb-10 leading-relaxed animate-fade-in-up [animation-delay:0.2s]">
          Transcribe, summarize, extract key decisions, and chat with your
          videos using advanced Retrieval-Augmented Generation.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-4 mb-14 animate-fade-in-up [animation-delay:0.3s] max-md:flex-col max-md:w-full">
          <button
            onClick={() => navigate('/analyze')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-br from-[var(--color-purple)] to-[var(--color-violet)] shadow-[0_4px_16px_rgba(124,58,237,0.3)] cursor-pointer border-none transition-all hover:shadow-[0_6px_24px_rgba(124,58,237,0.45)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] max-md:w-full"
          >
            <span>⚡</span> Start Analyzing
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-[var(--color-text-primary)] rounded-xl bg-transparent border border-[var(--color-border-default)] cursor-pointer transition-all hover:border-[var(--color-purple-light)] hover:bg-[rgba(124,58,237,0.08)] max-md:w-full"
          >
            See How It Works →
          </button>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 animate-fade-in-up [animation-delay:0.4s] max-md:gap-5">
          <div className="flex flex-col items-center gap-1">
            <span className="font-[var(--font-display)] text-2xl font-extrabold gradient-text">6</span>
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">AI Extractions</span>
          </div>
          <div className="w-px h-9 bg-[var(--color-border-default)]" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-[var(--font-display)] text-2xl font-extrabold gradient-text">RAG</span>
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Chat System</span>
          </div>
          <div className="w-px h-9 bg-[var(--color-border-default)]" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-[var(--font-display)] text-2xl font-extrabold gradient-text">2</span>
            <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Languages</span>
          </div>
        </div>
      </div>
    </section>
  );
}
