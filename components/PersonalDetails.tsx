"use client";

const FEDERATIONS = [
  "Jain Company Secretary Federation",
  "Jain Chartered Accountant Federation",
  "Jain Doctor Federation",
  "Jain Advocate Federation",
  "Jain Banker Federation",
  "Jain Pharma Federation",
];

interface PersonalDetailsProps {
  data: {
    federation: string;
    memberName: string;
    membershipNumber: string;
    email: string;
    whatsapp: string;
    alternateNumber: string;
    address: string;
    city: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function PersonalDetails({ data, onChange }: PersonalDetailsProps) {
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white/60 transition-all duration-200 placeholder-gray-400 focus:border-yellow-500 hover:border-gray-300";

  return (
    <div className="space-y-5">
      {/* Federation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Federation <span className="text-red-400">*</span>
        </label>
        <select
          className={inputCls}
          value={data.federation}
          onChange={(e) => onChange("federation", e.target.value)}
        >
          <option value="">— Select your federation —</option>
          {FEDERATIONS.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Name + Membership */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Member Name <span className="text-red-400">*</span>
          </label>
          <input
            className={inputCls}
            placeholder="Full name as per ID"
            value={data.memberName}
            onChange={(e) => onChange("memberName", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Membership Number
          </label>
          <input
            className={inputCls}
            placeholder="e.g. JCSF-12345"
            value={data.membershipNumber}
            onChange={(e) => onChange("membershipNumber", e.target.value)}
          />
        </div>
      </div>

      {/* Email + WhatsApp */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            className={inputCls}
            placeholder="you@example.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            WhatsApp Number <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            className={inputCls}
            placeholder="+91 98765 43210"
            value={data.whatsapp}
            onChange={(e) => onChange("whatsapp", e.target.value)}
          />
        </div>
      </div>

      {/* Alternate + City */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Alternate Number
          </label>
          <input
            type="tel"
            className={inputCls}
            placeholder="Optional"
            value={data.alternateNumber}
            onChange={(e) => onChange("alternateNumber", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            City <span className="text-red-400">*</span>
          </label>
          <input
            className={inputCls}
            placeholder="Your city"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Address
        </label>
        <textarea
          className={inputCls + " resize-none"}
          placeholder="Your full address"
          rows={3}
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </div>
    </div>
  );
}
