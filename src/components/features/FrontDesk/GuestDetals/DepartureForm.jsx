import { useState } from "react";

export default function DepartureForm() {
  const [activeTab, setActiveTab] = useState("departure");
  const [formData, setFormData] = useState({
    mode: "",
    departureFlightNumber: "",
    departureTime: "",
    departureTimePeriod: "PM",
    assignTask: true,
    sendEmail: false,
  });

  const updateField = (field, value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const inputClass =
    "flex-1 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm focus:border-[#9dc43b] focus:bg-white focus:outline-none";
  const labelClass = "w-36 shrink-0 text-sm font-medium text-gray-500";

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm ring-1 ring-gray-100">
        <div className="flex border-b border-gray-100">
          {["arrival", "departure"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-[#9dc43b] text-[#9dc43b]"
                  : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-2.5">
            <label className={labelClass}>Mode</label>
            <select
              value={formData.mode}
              onChange={(e) => updateField("mode", e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-[#9dc43b] focus:outline-none"
            >
              <option value="">Select Mode</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="car">Car</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4 px-4">
            <label className={labelClass}>Departure / Flight#</label>
            <input
              type="text"
              value={formData.departureFlightNumber}
              onChange={(e) => updateField("departureFlightNumber", e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="flex items-center gap-4 rounded-xl bg-gray-50 px-4 py-2.5">
            <label className={labelClass}>Departure Time</label>
            <input
              type="text"
              value={formData.departureTime}
              onChange={(e) => updateField("departureTime", e.target.value)}
              placeholder="HH:MM"
              className="w-24 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-center text-sm focus:border-[#9dc43b] focus:outline-none"
            />
            <select
              value={formData.departureTimePeriod}
              onChange={(e) => updateField("departureTimePeriod", e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-[#9dc43b] focus:outline-none"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <div className="flex items-center gap-4 px-4 py-1">
            <label className={labelClass}>Assign Task</label>
            <input
              type="checkbox"
              checked={formData.assignTask}
              onChange={(e) => updateField("assignTask", e.target.checked)}
              className="h-4 w-4 accent-[#9dc43b]"
            />
          </div>

          <div className="flex items-center gap-4 px-4 py-1">
            <label className={labelClass}>Send Email</label>
            <input
              type="checkbox"
              checked={formData.sendEmail}
              onChange={(e) => updateField("sendEmail", e.target.checked)}
              className="h-4 w-4 accent-[#9dc43b]"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-sm font-bold tracking-widest text-gray-700 uppercase">Split Reservation</h2>

        <div className="mb-3 grid grid-cols-2 border-b border-gray-100 pb-2">
          <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Date</span>
          <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">Room Type / Room</span>
        </div>

        <div className="rounded-xl bg-gray-50 px-4 py-3 text-center text-sm text-gray-400">No room splits</div>
      </div>
    </div>
  );
}
