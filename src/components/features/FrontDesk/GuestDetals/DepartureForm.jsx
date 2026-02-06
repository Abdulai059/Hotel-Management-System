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

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border-2 border-gray-300 bg-white">
        <div className="flex border-b-2 border-gray-300">
          {["arrival", "departure"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 text-base font-medium transition ${
                activeTab === tab
                  ? "border-b-4 border-blue-700 text-blue-700"
                  : "bg-gray-50 text-gray-500 hover:bg-gray-100"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4 p-4">
          <div className="flex items-center gap-4 rounded bg-gray-100 p-2">
            <label className="w-32 font-medium text-gray-700">Mode</label>
            <select
              value={formData.mode}
              onChange={(e) => updateField("mode", e.target.value)}
              className="flex-1 rounded border border-gray-300 px-3 py-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Mode</option>
              <option value="flight">Flight</option>
              <option value="train">Train</option>
              <option value="car">Car</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium text-gray-600">Departure / Flight#</label>
            <input
              type="text"
              value={formData.departureFlightNumber}
              onChange={(e) => updateField("departureFlightNumber", e.target.value)}
              className="py-0focus:ring-2 flex-1 rounded border border-gray-300 px-3 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-4 rounded bg-gray-100 p-0">
            <label className="w-32 font-medium text-gray-700">Departure Time</label>
            <input
              type="text"
              value={formData.departureTime}
              onChange={(e) => updateField("departureTime", e.target.value)}
              placeholder=":"
              className="w-20 rounded border border-gray-300 px-3 py-0 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <select
              value={formData.departureTimePeriod}
              onChange={(e) => updateField("departureTimePeriod", e.target.value)}
              className="rounded border border-gray-300 px-3 py-0 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="w-32 font-medium text-gray-600">Assign Task</label>
            <input
              type="checkbox"
              checked={formData.assignTask}
              onChange={(e) => updateField("assignTask", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4 rounded">
            <label className="w-32 font-medium text-gray-700">Send Email</label>
            <input
              type="checkbox"
              checked={formData.sendEmail}
              onChange={(e) => updateField("sendEmail", e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleSubmit}
              className="rounded bg-blue-600 px-6 py-1.5 font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
        <h2 className="mb-4 text-lg font-semibold text-blue-900">Split Reservation</h2>

        <div className="mb-4 grid grid-cols-2 border-b-2 border-gray-800 pb-2 text-sm font-medium text-gray-800">
          <div>Date</div>
          <div>Room Type / Room</div>
        </div>

        <div className="rounded bg-gray-100 p-2 text-center text-gray-600">There are no room splits</div>
      </div>
    </div>
  );
}
