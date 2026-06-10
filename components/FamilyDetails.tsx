"use client";

const TSHIRT_SIZES = ["S", "M", "L", "XL", "XXL"];

export interface FamilyMember {
  name: string;
  whatsapp: string;
  age: string;
  tshirtSize: string;
}

interface FamilyDetailsProps {
  familyJoining: boolean;
  familyMembers: FamilyMember[];
  onToggle: (val: boolean) => void;
  onUpdate: (index: number, field: string, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export default function FamilyDetails({
  familyJoining,
  familyMembers,
  onToggle,
  onUpdate,
  onAdd,
  onRemove,
}: FamilyDetailsProps) {
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white/80 transition-all duration-200 placeholder-gray-400 focus:border-yellow-500";

  return (
    <div className="space-y-5">
      {/* Yes / No toggle */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-3">
          Are family members joining?{" "}
          <span className="text-red-400">*</span>
        </p>
        <div className="flex gap-3">
          {[
            { label: "Yes, family joining", value: true },
            { label: "No, just me", value: false },
          ].map((opt) => (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onToggle(opt.value)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border text-sm font-medium transition-all duration-200"
              style={
                familyJoining === opt.value
                  ? {
                      background: "linear-gradient(135deg,#C9A227,#FF9933)",
                      color: "white",
                      border: "2px solid transparent",
                      boxShadow: "0 4px 15px rgba(201,162,39,0.3)",
                    }
                  : {
                      background: "white",
                      color: "#6b7280",
                      border: "2px solid #e5e7eb",
                    }
              }
            >
              <span
                className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
                style={{
                  borderColor: familyJoining === opt.value ? "white" : "#d1d5db",
                }}
              >
                {familyJoining === opt.value && (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Family member cards */}
      {familyJoining && (
        <div className="space-y-4 fade-in-up">
          {familyMembers.map((member, index) => (
            <div
              key={index}
              className="rounded-2xl p-5 border border-amber-100"
              style={{ background: "rgba(255,248,230,0.5)" }}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                    style={{ background: "linear-gradient(135deg,#C9A227,#FF9933)" }}
                  >
                    {index + 1}
                  </div>
                  <h4 className="font-semibold text-gray-800">
                    {member.name || `Family Member ${index + 1}`}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="w-8 h-8 rounded-full bg-red-50 hover:bg-red-100 text-red-400 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    className={inputCls}
                    placeholder="Family member name"
                    value={member.name}
                    onChange={(e) => onUpdate(index, "name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    className={inputCls}
                    placeholder="+91 98765 43210"
                    value={member.whatsapp}
                    onChange={(e) => onUpdate(index, "whatsapp", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Age
                  </label>
                  <input
                    type="number"
                    className={inputCls}
                    placeholder="Age in years"
                    min={1}
                    max={120}
                    value={member.age}
                    onChange={(e) => onUpdate(index, "age", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    T-Shirt Size
                  </label>
                  <div className="flex gap-2">
                    {TSHIRT_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => onUpdate(index, "tshirtSize", size)}
                        className="flex-1 py-2 rounded-lg text-sm font-medium border transition-all"
                        style={
                          member.tshirtSize === size
                            ? {
                                background: "linear-gradient(135deg,#C9A227,#FF9933)",
                                color: "white",
                                borderColor: "transparent",
                              }
                            : {
                                background: "white",
                                color: "#6b7280",
                                borderColor: "#e5e7eb",
                              }
                        }
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add member button */}
          <button
            type="button"
            onClick={onAdd}
            className="w-full py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all duration-200 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center gap-2"
            style={{ borderColor: "#d1d5db", color: "#9ca3af" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Another Family Member
          </button>
        </div>
      )}
    </div>
  );
}
