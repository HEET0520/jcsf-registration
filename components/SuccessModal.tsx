"use client";

import { useEffect, useState } from "react";

interface SuccessModalProps {
  registrationId: string;
  memberName: string;
  onClose: () => void;
}

export default function SuccessModal({
  registrationId,
  memberName,
  onClose,
}: SuccessModalProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Slight delay for animation
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="w-full max-w-md rounded-3xl overflow-hidden transition-all duration-500"
        style={{
          transform: show ? "scale(1) translateY(0)" : "scale(0.9) translateY(20px)",
          opacity: show ? 1 : 0,
          background: "#FFFDF7",
          boxShadow: "0 40px 80px rgba(0,0,0,0.3)",
        }}
      >
        {/* Top gradient strip */}
        <div
          className="h-2"
          style={{ background: "linear-gradient(90deg,#C9A227,#FF9933,#C9A227)" }}
        />

        <div className="p-8 text-center">
          {/* Success icon */}
          <div
            className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl"
            style={{
              background: "linear-gradient(135deg,#C9A227,#FF9933)",
              boxShadow: "0 8px 32px rgba(201,162,39,0.4)",
            }}
          >
            ✓
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Registration Submitted!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Welcome,{" "}
            <span className="font-semibold text-gray-700">
              {memberName || "attendee"}
            </span>
            ! Your registration for the Jio Jain National Conclave has been
            received.
          </p>

          {/* Registration ID */}
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              background: "linear-gradient(135deg,rgba(201,162,39,0.08),rgba(255,153,51,0.08))",
              border: "1px solid rgba(201,162,39,0.25)",
            }}
          >
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
              Your Registration ID
            </p>
            <p
              className="text-3xl font-bold font-mono"
              style={{
                background: "linear-gradient(135deg,#C9A227,#FF9933)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {registrationId}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Please save this ID for future reference
            </p>
          </div>

          {/* What happens next */}
          <div className="text-left rounded-2xl p-4 mb-6 bg-gray-50">
            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
              What happens next?
            </p>
            <div className="space-y-2">
              {[
                "Your registration is being reviewed",
                "You will receive a confirmation on WhatsApp",
                "Event details will be shared closer to the date",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5"
                    style={{
                      background: "linear-gradient(135deg,#C9A227,#FF9933)",
                      fontSize: "8px",
                    }}
                  >
                    {i + 1}
                  </span>
                  {step}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                // Download placeholder - future implementation
                const text = `Jio Jain National Conclave\nRegistration ID: ${registrationId}\nName: ${memberName}\nThank you for registering!`;
                const blob = new Blob([text], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `JCSF-Confirmation-${registrationId}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#C9A227,#FF9933)",
                boxShadow: "0 4px 15px rgba(201,162,39,0.3)",
              }}
            >
              📄 Download Confirmation
            </button>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-gray-600 text-sm border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
