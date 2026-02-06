import DashedLine from "@/components/ui/DashedLine";
import { Bed, Edit, Edit3, Pencil } from "lucide-react";
import { useRef } from "react";

export default function StayDetails({ bookingData, isEditing, handleInputChange, getStatusColor }) {
  const checkInInputRef = useRef(null);
  const checkOutInputRef = useRef(null);

  const handleDateChange = (type, value) => {
    const date = new Date(value);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (type === "checkIn") {
      handleInputChange("stay", "checkInDate", days[date.getDay()]);
      handleInputChange("stay", "checkInDay", date.getDate().toString());
      handleInputChange("stay", "checkInMonth", months[date.getMonth()]);
    } else {
      handleInputChange("stay", "checkOutDate", days[date.getDay()]);
      handleInputChange("stay", "checkOutDay", date.getDate().toString());
      handleInputChange("stay", "checkOutMonth", months[date.getMonth()]);
    }
  };

  return (
    <div className="relative w-full rounded-lg border border-gray-300 bg-white p-4">
      <h3 className="mb-4 text-lg font-semibold text-blue-900 uppercase">Stay Details</h3>

      <div className="mb-6 flex items-center justify-between">
        <div
          className={`group relative min-w-32.5 rounded-lg pb-4 text-center shadow-sm ${isEditing ? "cursor-pointer hover:ring-2 hover:ring-blue-400" : ""}`}
          onClick={() => isEditing && checkInInputRef.current?.showPicker()}
        >
          {isEditing && (
            <div className="absolute top-12 right-2 hidden p-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
          )}

          <div className="rounded-t-md bg-red-600 p-2 text-xs font-semibold text-white">
            {bookingData.stay.checkInDate}
          </div>

          <span className="block bg-gray-50 py-2 text-center">
            <div className="pb-2 text-2xl font-bold">{bookingData.stay.checkInDay}</div>
            <div className="text-xs">{bookingData.stay.checkInMonth}</div>
          </span>

          {isEditing && (
            <input
              ref={checkInInputRef}
              type="date"
              onChange={(e) => handleDateChange("checkIn", e.target.value)}
              className="pointer-events-none absolute opacity-0"
            />
          )}
        </div>

        <div className="mx-4 flex flex-col items-center">
          <div className="text-xl font-bold text-gray-700">{bookingData.stay.nights}</div>
          <div className="text-xs text-gray-500">Nt</div>
          <DashedLine />
          <div className="mt-2 flex items-center gap-1 text-gray-500">
            <Bed size={16} />
            <span className="text-sm">{bookingData.stay.guests}</span>
          </div>
        </div>
      </div>

      <div className="space-y-1 pb-8 text-sm">
        {["purpose", "source", "type", "mktSgmt", "salesPerson"].map((field) => (
          <div key={field} className="flex justify-between border-b border-gray-200 py-2">
            <span className="text-gray-500">{field.replace(/([A-Z])/g, " $1")}</span>
            {isEditing ? (
              <input
                type="text"
                value={bookingData.stay[field]}
                onChange={(e) => handleInputChange("stay", field, e.target.value)}
                className="w-32 rounded border border-gray-300 px-2 text-right text-gray-700"
              />
            ) : (
              <span className="text-gray-700">{bookingData.stay[field]}</span>
            )}
          </div>
        ))}
      </div>

      <button className="absolute right-4 bottom-4 text-gray-600 hover:text-gray-800">
        <Edit size={18} />
      </button>
    </div>
  );
}
