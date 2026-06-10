"use client";

interface HeroProps {
  onStartRegistration: () => void;
}

export default function Hero({ onStartRegistration }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background gradient (replaces image) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(160deg, #6D1F1F 0%, #3D0C0C 40%, #1a0a0a 70%, #0d0404 100%)",
        }}
      />

      {/* Decorative orbs */}
      <div
        className="absolute top-20 left-20 w-96 h-96 rounded-full opacity-20 blur-3xl z-0"
        style={{ background: "#C9A227" }}
      />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-15 blur-3xl z-0"
        style={{ background: "#FF9933" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl z-0"
        style={{ background: "#C9A227" }}
      />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium"
          style={{
            background: "rgba(201,162,39,0.15)",
            border: "1px solid rgba(201,162,39,0.4)",
            color: "#C9A227",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
          Registrations Open · 2026
        </div>

        {/* Om / Jain symbol decorative */}
        <div className="text-5xl mb-4 opacity-70">🕉</div>

        {/* Main title */}
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{
            background: "linear-gradient(135deg, #C9A227 0%, #FF9933 50%, #C9A227 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Jio Jain
          <br />
          National Conclave
        </h1>

        {/* Location */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 opacity-40" style={{ background: "#C9A227" }} />
          <p className="text-xl md:text-2xl font-light tracking-widest text-white/80 uppercase">
            Palitana · Gujarat
          </p>
          <div className="h-px w-16 opacity-40" style={{ background: "#C9A227" }} />
        </div>

        {/* Description */}
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join Jain professionals from across India for an enriching experience
          of networking, collaboration, and community engagement at the sacred
          city of Palitana.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {[
            { label: "Federations", value: "6+" },
            { label: "Expected Attendees", value: "500+" },
            { label: "City", value: "Palitana" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "#C9A227" }}
              >
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={onStartRegistration}
          className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{
            background: "linear-gradient(135deg, #C9A227, #FF9933)",
            boxShadow: "0 8px 32px rgba(201,162,39,0.4)",
          }}
        >
          <span>Start Registration</span>
          <svg
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>

        {/* Scroll hint */}
        <div className="mt-10 flex flex-col items-center gap-2 text-white/30 text-sm">
          <span>Scroll to register</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
