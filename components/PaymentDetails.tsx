"use client";

import { useRef, useState } from "react";

interface PaymentDetailsProps {
  familyCount: number;
  totalAmount: number;
  onScreenshotChange: (file: File | null) => void;
  screenshotPreview: string | null;
}

export default function PaymentDetails({
  familyCount,
  totalAmount,
  onScreenshotChange,
  screenshotPreview,
}: PaymentDetailsProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);
  const UPI_ID = "jcsf@upi";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onScreenshotChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0] || null;
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      onScreenshotChange(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Fee breakdown */}
      <div
        className="rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg,rgba(201,162,39,0.08),rgba(255,153,51,0.08))" }}
      >
        <h4 className="font-semibold text-gray-800 mb-4">Fee Breakdown</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Member Registration Fee</span>
            <span className="font-semibold">₹3,000</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">
              Family Members ({familyCount}) × ₹2,000
            </span>
            <span className="font-semibold">
              ₹{(familyCount * 2000).toLocaleString()}
            </span>
          </div>
          <div className="border-t border-amber-200 my-2" />
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900 text-lg">Total Amount</span>
            <span
              className="text-2xl font-bold"
              style={{ color: "#C9A227" }}
            >
              ₹{totalAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* QR + UPI */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* QR Code */}
        <div
          className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-8 px-4"
          style={{ borderColor: "rgba(201,162,39,0.3)", background: "rgba(255,253,247,0.8)" }}
        >
          {/* Placeholder QR — replace with actual QR image */}
          <div
            className="w-40 h-40 rounded-xl flex items-center justify-center text-5xl mb-3"
            style={{ background: "rgba(201,162,39,0.1)" }}
          >
            {/* If you have a qr.png in /public, replace this with: */}
            {/* <img src="/qr.png" alt="QR Code" className="w-full h-full object-contain rounded-xl" /> */}
            <span>📱</span>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Scan QR to pay via UPI
          </p>
        </div>

        {/* UPI ID */}
        <div className="flex flex-col justify-center gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
              UPI ID
            </p>
            <div
              className="flex items-center gap-3 rounded-xl px-4 py-3 border"
              style={{ background: "white", borderColor: "#e5e7eb" }}
            >
              <span className="font-mono font-semibold text-gray-900 flex-1">
                {UPI_ID}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200"
                style={
                  copied
                    ? { background: "#d1fae5", color: "#065f46" }
                    : { background: "rgba(201,162,39,0.1)", color: "#C9A227" }
                }
              >
                {copied ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <div
            className="rounded-xl p-4 text-sm"
            style={{ background: "rgba(254,243,199,0.7)", color: "#92400e" }}
          >
            <p className="font-semibold mb-1">📌 Payment Instructions</p>
            <ul className="text-xs space-y-1 text-amber-800/80">
              <li>• Pay the exact amount: <strong>₹{totalAmount.toLocaleString()}</strong></li>
              <li>• Take a screenshot after payment</li>
              <li>• Upload the screenshot below</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Screenshot upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Payment Screenshot{" "}
          <span className="text-red-400">*</span>
        </label>

        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={handleFile}
        />

        {screenshotPreview ? (
          <div className="relative rounded-2xl overflow-hidden border border-green-200">
            <img
              src={screenshotPreview}
              alt="Payment screenshot"
              className="w-full max-h-64 object-contain bg-gray-50"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-end">
              <div className="w-full p-3 bg-gradient-to-t from-black/60 to-transparent flex items-center justify-between">
                <span className="text-white text-xs">✓ Screenshot uploaded</span>
                <button
                  type="button"
                  onClick={() => {
                    onScreenshotChange(null);
                    if (fileRef.current) fileRef.current.value = "";
                  }}
                  className="text-xs text-white/80 hover:text-white underline"
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="rounded-2xl border-2 border-dashed p-8 flex flex-col items-center gap-3 cursor-pointer transition-all duration-200 hover:bg-amber-50 hover:border-amber-300"
            style={{ borderColor: "rgba(201,162,39,0.3)", background: "rgba(255,253,247,0.5)" }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(201,162,39,0.1)" }}
            >
              <svg className="w-6 h-6" style={{ color: "#C9A227" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-medium text-gray-700 text-sm">
                Click to upload or drag &amp; drop
              </p>
              <p className="text-xs text-gray-400 mt-1">JPG, JPEG, PNG supported</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
