"use client";

interface EventPassProps {
  memberName: string;
  federation: string;
  city: string;
  membershipNumber: string;
}

export default function EventPass({
  memberName,
  federation,
  city,
  membershipNumber,
}: EventPassProps) {
  const displayName = memberName || "Your Name";
  const displayFed = federation || "Your Federation";
  const displayCity = city || "Your City";

  // Shorten federation label
  const fedShort = federation
    .replace("Jain ", "")
    .replace(" Federation", "")
    .trim();

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-gray-900 flex items-center gap-2">
        <span className="text-lg">🎫</span> Event Pass Preview
      </h3>
      <p className="text-xs text-gray-500">Updates in real-time as you type</p>

      {/* Pass card */}
      <div
        className="pass-shine relative rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #6D1F1F 0%, #3D0C0C 60%, #1a0404 100%)",
          boxShadow: "0 20px 60px rgba(109,31,31,0.4)",
        }}
      >
        {/* Decorative top strip */}
        <div
          className="h-1.5 w-full"
          style={{ background: "linear-gradient(90deg,#C9A227,#FF9933,#C9A227)" }}
        />

        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, #C9A227 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FF9933 0%, transparent 50%)",
          }}
        />

        <div className="relative p-6">
          {/* Event name */}
          <div className="mb-5">
            <p
              className="text-xs tracking-[0.25em] uppercase font-medium mb-1"
              style={{ color: "#C9A227" }}
            >
              ✦ Official Pass ✦
            </p>
            <h4 className="text-white font-bold text-base leading-tight">
              JIO JAIN NATIONAL
              <br />
              CONCLAVE 2026
            </h4>
          </div>

          {/* Divider */}
          <div
            className="h-px w-full mb-5 opacity-30"
            style={{ background: "linear-gradient(90deg,#C9A227,transparent)" }}
          />

          {/* Name */}
          <div className="mb-4">
            <p className="text-white/50 text-xs mb-1 uppercase tracking-wider">
              Attendee
            </p>
            <p
              className="text-2xl font-bold leading-tight"
              style={{
                background: "linear-gradient(135deg,#C9A227,#FF9933)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayName}
            </p>
          </div>

          {/* Federation */}
          <div className="mb-3">
            <p className="text-white/50 text-xs mb-0.5 uppercase tracking-wider">
              Federation
            </p>
            <p className="text-white/90 text-sm font-medium">
              {fedShort || displayFed}
            </p>
          </div>

          {/* City + ID row */}
          <div className="flex items-end justify-between mt-5">
            <div>
              <p className="text-white/50 text-xs mb-0.5 uppercase tracking-wider">
                City
              </p>
              <p className="text-white/90 text-sm font-medium">{displayCity}</p>
            </div>
            {membershipNumber && (
              <div className="text-right">
                <p className="text-white/50 text-xs mb-0.5 uppercase tracking-wider">
                  Member ID
                </p>
                <p className="text-white/70 text-xs font-mono">
                  {membershipNumber}
                </p>
              </div>
            )}
          </div>

          {/* Bottom strip */}
          <div
            className="mt-5 pt-4 flex items-center justify-between"
            style={{ borderTop: "1px solid rgba(201,162,39,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🕉</span>
              <span className="text-white/40 text-xs">Palitana · Gujarat</span>
            </div>
            {/* Simulated barcode */}
            <div className="flex gap-0.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{
                    height: `${10 + ((i * 7) % 10)}px`,
                    background: `rgba(201,162,39,${0.3 + ((i * 3) % 6) * 0.1})`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom color strip */}
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg,#FF9933,#C9A227,#FF9933)" }}
        />
      </div>

      <p className="text-xs text-center text-gray-400">
        ✨ This is a preview — your actual pass will be generated upon confirmation
      </p>
    </div>
  );
}
