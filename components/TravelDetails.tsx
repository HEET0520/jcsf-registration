"use client";

const TICKET_STATUSES = ["Confirmed", "Waiting", "RAC"];

interface TravelData {
  travelMode: string;
  trainArrivalStatus: string;
  trainArrivalNumber: string;
  trainArrivalCoach: string;
  trainReturnStatus: string;
  trainReturnNumber: string;
  trainReturnCoach: string;
}

interface TravelDetailsProps {
  data: TravelData;
  onChange: (field: string, value: string) => void;
}

export default function TravelDetails({ data, onChange }: TravelDetailsProps) {
  const inputCls =
    "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-white/80 transition-all duration-200 placeholder-gray-400 focus:border-yellow-500";

  return (
    <div className="space-y-4">
      {/* Journey to Palitana */}
      <div
        className="rounded-2xl p-5 border border-blue-100"
        style={{ background: "rgba(239,246,255,0.6)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🚆</span>
          <div>
            <h4 className="font-semibold text-gray-800">Journey to Palitana</h4>
            <p className="text-xs text-gray-500">Inbound train details</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Ticket Status
            </label>
            <select
              className={inputCls}
              value={data.trainArrivalStatus}
              onChange={(e) => onChange("trainArrivalStatus", e.target.value)}
            >
              <option value="">Select status</option>
              {TICKET_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Train Number
            </label>
            <input
              className={inputCls}
              placeholder="e.g. 12009"
              value={data.trainArrivalNumber}
              onChange={(e) => onChange("trainArrivalNumber", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Coach Number
            </label>
            <input
              className={inputCls}
              placeholder="e.g. S4, B1"
              value={data.trainArrivalCoach}
              onChange={(e) => onChange("trainArrivalCoach", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Return Journey */}
      <div
        className="rounded-2xl p-5 border border-green-100"
        style={{ background: "rgba(240,253,244,0.6)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🔄</span>
          <div>
            <h4 className="font-semibold text-gray-800">Return Journey</h4>
            <p className="text-xs text-gray-500">Outbound train details</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Ticket Status
            </label>
            <select
              className={inputCls}
              value={data.trainReturnStatus}
              onChange={(e) => onChange("trainReturnStatus", e.target.value)}
            >
              <option value="">Select status</option>
              {TICKET_STATUSES.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Train Number
            </label>
            <input
              className={inputCls}
              placeholder="e.g. 12010"
              value={data.trainReturnNumber}
              onChange={(e) => onChange("trainReturnNumber", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Coach Number
            </label>
            <input
              className={inputCls}
              placeholder="e.g. S4, B1"
              value={data.trainReturnCoach}
              onChange={(e) => onChange("trainReturnCoach", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
