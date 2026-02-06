import { Bed } from "lucide-react";

export default function BookingHeader({ bookingData, isEditing, setIsEditing, handleInputChange }) {
  return (
    <div className="mb-4 flex items-center justify-between rounded-sm bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={`rounded px-3 py-1.5 text-xs font-bold uppercase shadow transition ${
            isEditing ? "bg-green-500 hover:bg-green-600" : "bg-yellow-400 text-gray-900 hover:bg-yellow-500"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <div className="flex items-center gap-2">
          <Bed size={20} />
          {isEditing ? (
            <input
              type="text"
              value={bookingData.room.type || ""}
              onChange={(e) => handleInputChange("room", "type", e.target.value)}
              className="border-b border-white bg-transparent px-2 text-lg font-semibold text-white outline-none"
            />
          ) : (
            <span className="text-lg font-semibold">{bookingData.room.type}</span>
          )}
        </div>

        <span className="text-lg">
          #
          {isEditing ? (
            <input
              type="text"
              value={bookingData.room.number || ""}
              onChange={(e) => handleInputChange("room", "number", e.target.value)}
              className="ml-1 w-24 border-b border-white bg-transparent text-white outline-none"
            />
          ) : (
            bookingData.room.number
          )}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <span className="text-xs font-bold text-blue-600">i</span>
        </div>

        <span className="text-lg font-semibold text-yellow-300">
          {isEditing ? (
            <select
              value={bookingData.room.status || ""}
              onChange={(e) => handleInputChange("room", "status", e.target.value)}
              className="border-b border-yellow-300 bg-transparent text-yellow-300 outline-none"
            >
              <option className="text-black" value="Reserved">
                Reserved
              </option>
              <option className="text-black" value="Checked In">
                Checked In
              </option>
              <option className="text-black" value="Checked Out">
                Checked Out
              </option>
            </select>
          ) : (
            bookingData.room.status
          )}
        </span>

        <span className="text-lg font-semibold text-yellow-300">
          Res#
          {isEditing ? (
            <input
              type="text"
              value={bookingData.room.resId || ""}
              onChange={(e) => handleInputChange("room", "resId", e.target.value)}
              className="ml-1 w-24 border-b border-yellow-300 bg-transparent text-yellow-300 outline-none"
            />
          ) : (
            ` ${bookingData.room.resId}`
          )}
        </span>
      </div>
    </div>
  );
}
