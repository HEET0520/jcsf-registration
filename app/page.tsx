"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import PersonalDetails from "@/components/PersonalDetails";
import FamilyDetails, { FamilyMember } from "@/components/FamilyDetails";
import TravelDetails from "@/components/TravelDetails";
import PaymentDetails from "@/components/PaymentDetails";
import EventPass from "@/components/EventPass";
import RegistrationSummary from "@/components/RegistrationSummary";
import SuccessModal from "@/components/SuccessModal";

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="section-badge">{step}</div>
      <div>
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function RegistrationPage() {
  // Controls whether we show the Hero or the Form
  const [started, setStarted] = useState(false);
  // Controls the CSS transition — slight delay so the class applies after mount
  const [visible, setVisible] = useState(false);

  const handleStartRegistration = () => {
    setStarted(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Trigger fade-in after the form mounts
  useEffect(() => {
    if (started) {
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [started]);

  // ── Personal ────────────────────────────────────────────────────────────────
  const [personal, setPersonal] = useState({
    federation: "",
    memberName: "",
    membershipNumber: "",
    email: "",
    whatsapp: "",
    alternateNumber: "",
    address: "",
    city: "",
  });

  const handlePersonalChange = (field: string, value: string) => {
    setPersonal((prev) => ({ ...prev, [field]: value }));
  };

  // ── Family ──────────────────────────────────────────────────────────────────
  const [familyJoining, setFamilyJoining] = useState(false);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);

  const handleFamilyToggle = (val: boolean) => {
    setFamilyJoining(val);
    if (!val) setFamilyMembers([]);
    else if (val && familyMembers.length === 0)
      setFamilyMembers([{ name: "", whatsapp: "", age: "", tshirtSize: "" }]);
  };

  const handleFamilyUpdate = (index: number, field: string, value: string) => {
    setFamilyMembers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleFamilyAdd = () => {
    setFamilyMembers((prev) => [
      ...prev,
      { name: "", whatsapp: "", age: "", tshirtSize: "" },
    ]);
  };

  const handleFamilyRemove = (index: number) => {
    setFamilyMembers((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0) setFamilyJoining(false);
      return updated;
    });
  };

  // ── Travel ──────────────────────────────────────────────────────────────────
  const [travel, setTravel] = useState({
    travelMode: "Train",
    trainArrivalStatus: "",
    trainArrivalNumber: "",
    trainArrivalCoach: "",
    trainReturnStatus: "",
    trainReturnNumber: "",
    trainReturnCoach: "",
  });

  const handleTravelChange = (field: string, value: string) => {
    setTravel((prev) => ({ ...prev, [field]: value }));
  };

  // ── Payment ─────────────────────────────────────────────────────────────────
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const handleScreenshotChange = (file: File | null) => {
    setScreenshot(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setScreenshotPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setScreenshotPreview(null);
    }
  };

  // ── Derived ─────────────────────────────────────────────────────────────────
  const familyCount = familyJoining ? familyMembers.length : 0;
  const totalAmount = 3000 + familyCount * 2000;

  // ── Submission ──────────────────────────────────────────────────────────────
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);

    if (!personal.federation)
      return setError("Please select your federation.");
    if (!personal.memberName.trim())
      return setError("Please enter your name.");
    if (!personal.email.trim())
      return setError("Please enter your email.");
    if (!personal.whatsapp.trim())
      return setError("Please enter your WhatsApp number.");
    if (!personal.city.trim())
      return setError("Please enter your city.");

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      Object.entries(personal).forEach(([k, v]) => fd.append(k, v));
      fd.append("familyJoining", String(familyJoining));
      fd.append("familyMembers", JSON.stringify(familyMembers));
      Object.entries(travel).forEach(([k, v]) => fd.append(k, v));
      fd.append("totalAmount", String(totalAmount));
      fd.append("screenshot", screenshot);

      const res = await fetch("/api/register", { method: "POST", body: fd });
      const json = await res.json();

      if (!res.ok)
        throw new Error(json.error || "Submission failed. Please try again.");

      setSuccessId(json.registrationId);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  // ── Hero view ────────────────────────────────────────────────────────────────
  if (!started) {
    return (
      <main className="min-h-screen" style={{ background: "#FFFDF7" }}>
        <Hero onStartRegistration={handleStartRegistration} />
      </main>
    );
  }

  // ── Registration Form view ────────────────────────────────────────────────────
  return (
    <main
      className="min-h-screen"
      style={{
        background: "#FFFDF7",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
      }}
    >
      {/* ── Top nav bar ── */}
      <header
        className="sticky top-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{
          background: "rgba(255,253,247,0.85)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(201,162,39,0.15)",
        }}
      >
        {/* Back to hero */}
        <button
          onClick={() => {
            setStarted(false);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
          className="flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70"
          style={{ color: "#C9A227" }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Event name */}
        <div className="flex items-center gap-2">
          <span className="text-base">🕉</span>
          <span
            className="font-bold text-sm hidden sm:block"
            style={{ color: "#6D1F1F" }}
          >
            Jio Jain National Conclave
          </span>
        </div>

        {/* Amount pill */}
        <div
          className="text-sm font-bold px-3 py-1.5 rounded-full"
          style={{
            background: "linear-gradient(135deg,rgba(201,162,39,0.12),rgba(255,153,51,0.12))",
            color: "#C9A227",
            border: "1px solid rgba(201,162,39,0.25)",
          }}
        >
          ₹{totalAmount.toLocaleString()}
        </div>
      </header>

      {/* ── Page title ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1" style={{ background: "linear-gradient(to right,#C9A227,transparent)" }} />
          <span
            className="text-sm font-semibold uppercase tracking-widest"
            style={{ color: "#C9A227" }}
          >
            Registration Journey
          </span>
          <div className="h-px flex-1" style={{ background: "linear-gradient(to left,#C9A227,transparent)" }} />
        </div>
      </div>

      {/* ── Form + Sidebar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 space-y-6 lg:space-y-0">

          {/* ── Left: Form ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. Personal */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg">
              <SectionHeader step={1} title="Personal Details" subtitle="Tell us about yourself" />
              <PersonalDetails data={personal} onChange={handlePersonalChange} />
            </div>

            {/* 2. Family */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg">
              <SectionHeader step={2} title="Family Members" subtitle="Are any family members joining you?" />
              <FamilyDetails
                familyJoining={familyJoining}
                familyMembers={familyMembers}
                onToggle={handleFamilyToggle}
                onUpdate={handleFamilyUpdate}
                onAdd={handleFamilyAdd}
                onRemove={handleFamilyRemove}
              />
            </div>

            {/* 3. Travel */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg">
              <SectionHeader step={3} title="Travel Details" subtitle="Your train journey details to Palitana" />
              <TravelDetails data={travel} onChange={handleTravelChange} />
            </div>

            {/* 4. Payment */}
            <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg">
              <SectionHeader step={4} title="Payment" subtitle="Complete your payment and upload the screenshot" />
              <PaymentDetails
                familyCount={familyCount}
                totalAmount={totalAmount}
                onScreenshotChange={handleScreenshotChange}
                screenshotPreview={screenshotPreview}
              />
            </div>

            {/* Error */}
            {error && (
              <div
                className="flex items-start gap-3 rounded-2xl p-4 fade-in-up"
                style={{ background: "#fef2f2", border: "1px solid #fecaca" }}
              >
                <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="font-semibold text-red-700 text-sm">Please fix the following:</p>
                  <p className="text-red-600 text-sm mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {/* Mobile submit */}
            <div className="lg:hidden">
              <RegistrationSummary
                memberName={personal.memberName}
                federation={personal.federation}
                familyCount={familyCount}
                totalAmount={totalAmount}
                isFormComplete={true}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>

          {/* ── Right: Sticky sidebar ── */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="glass-card rounded-3xl p-6 shadow-lg">
                <EventPass
                  memberName={personal.memberName}
                  federation={personal.federation}
                  city={personal.city}
                  membershipNumber={personal.membershipNumber}
                />
              </div>
              <div className="glass-card rounded-3xl p-6 shadow-lg">
                <RegistrationSummary
                  memberName={personal.memberName}
                  federation={personal.federation}
                  familyCount={familyCount}
                  totalAmount={totalAmount}
                  isFormComplete={true}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="py-8 text-center text-sm"
        style={{ background: "#1a0a0a", color: "rgba(255,255,255,0.4)" }}
      >
        <p className="mb-1">
          <span style={{ color: "#C9A227" }}>Jio Jain National Conclave</span> · Palitana, Gujarat
        </p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>

      {/* Success Modal */}
      {successId && (
        <SuccessModal
          registrationId={successId}
          memberName={personal.memberName}
          onClose={() => setSuccessId(null)}
        />
      )}
    </main>
  );
}
