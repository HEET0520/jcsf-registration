"use client";

interface RegistrationSummaryProps {
  memberName: string;
  federation: string;
  familyCount: number;
  totalAmount: number;
  isFormComplete: boolean;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function RegistrationSummary({
  memberName,
  federation,
  familyCount,
  totalAmount,
  isFormComplete,
  onSubmit,
  isSubmitting,
}: RegistrationSummaryProps) {
  const rows = [
    {
      icon: "👤",
      label: "Primary Member",
      value: memberName || "—",
      highlight: !!memberName,
    },
    {
      icon: "🏛️",
      label: "Federation",
      value: federation
        ? federation.replace("Jain ", "").replace(" Federation", "")
        : "—",
      highlight: !!federation,
    },
    {
      icon: "👨‍👩‍👧",
      label: "Participants",
      value: `${familyCount + 1} ${familyCount > 0 ? `(+${familyCount} family)` : ""}`,
      highlight: true,
    },
    {
      icon: "🚆",
      label: "Travel Mode",
      value: "Train",
      highlight: true,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900 flex items-center gap-2">
        <span className="text-lg">📋</span> Registration Summary
      </h3>

      {/* Summary rows */}
      <div
        className="rounded-2xl overflow-hidden border"
        style={{ borderColor: "rgba(201,162,39,0.2)" }}
      >
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-center gap-3 px-4 py-3"
            style={{
              borderBottom:
                i < rows.length - 1 ? "1px solid rgba(201,162,39,0.1)" : "none",
              background: row.highlight
                ? "rgba(255,253,247,0.8)"
                : "rgba(249,250,251,0.8)",
            }}
          >
            <span className="text-lg w-7">{row.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">{row.label}</p>
              <p
                className="text-sm font-medium truncate"
                style={{ color: row.highlight ? "#1a1a1a" : "#9ca3af" }}
              >
                {row.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Total amount */}
      <div
        className="rounded-2xl p-4"
        style={{
          background: "linear-gradient(135deg,rgba(201,162,39,0.12),rgba(255,153,51,0.12))",
          border: "1px solid rgba(201,162,39,0.25)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">
              Total Payable
            </p>
            <p
              className="text-3xl font-bold mt-0.5"
              style={{ color: "#C9A227" }}
            >
              ₹{totalAmount.toLocaleString()}
            </p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <p>₹3,000 member</p>
            {familyCount > 0 && (
              <p>
                + ₹{(familyCount * 2000).toLocaleString()} family
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Submit button */}
      <button
        type="button"
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-300 relative overflow-hidden"
        style={
          isSubmitting
            ? { background: "#9ca3af", cursor: "not-allowed" }
            : {
                background: "linear-gradient(135deg,#C9A227,#FF9933)",
                boxShadow: "0 8px 24px rgba(201,162,39,0.4)",
              }
        }
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Submitting…
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Complete Registration
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </button>

      <p className="text-xs text-center text-gray-400">
        🔒 Your data is securely stored. No payment info is stored on our servers.
      </p>
    </div>
  );
}
