import { formatDate } from "@/utils/dateHelpers";
import { Phone, Edit, Trash2, User } from "lucide-react";

export default function GuestDetails({ booking, isEditing, handleInputChange, onEdit, onDelete }) {
  const guest = booking.guests || {};
  const dobFormatted = formatDate(booking.guest?.date_of_birth);

  const renderInput = (field, type = "text") => {
    const value = guest[field] || "";
    if (isEditing) {
      if (type === "select") {
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange("guest", field, e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm focus:border-[#9dc43b] focus:outline-none"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        );
      }
      return (
        <input
          type={type}
          value={value}
          onChange={(e) => handleInputChange("guest", field, e.target.value)}
          className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1 text-sm focus:border-[#9dc43b] focus:outline-none"
        />
      );
    }
    return value;
  };

  const renderRow = (label1, field1, type1, label2, field2, type2) => {
    const value2 = guest[field2] || "";
    return (
      <div className="mb-2 flex justify-between text-sm">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-500">{label1}:</span>
          <span className="text-gray-700">{renderInput(field1, type1)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-gray-500">{label2}:</span>
          <span className="text-gray-700">
            {type2 === "date" ? formatDate(value2)?.full : renderInput(field2, type2)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl bg-gray-700 p-5">
      <h2 className="mb-4 text-sm font-bold tracking-widest text-[#e7f68f] uppercase">Guest Details</h2>

      <div className="w-full rounded-xl bg-white p-5">
        <div className="mb-5 flex items-center gap-4">
          <div className="bg-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-xl">
            <User className="h-8 w-8 text-emerald-700" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{guest.full_name || "—"}</p>
            <p className="text-xs text-gray-400">{guest.pId || ""}</p>
          </div>
        </div>

        <div className="flex flex-col text-sm">
          <div className="mb-2">
            <span className="font-semibold text-gray-500">Address: </span>
            <span className="text-gray-700">{renderInput("address")}</span>
          </div>
          {renderRow("City", "city", "text", "State", "state", "text")}
          {renderRow("Country", "country", "text", "Zipcode", "zip_code", "text")}
          {renderRow("Gender", "gender", "select", "DOB", "date_of_birth", "date", dobFormatted?.full)}
          {renderRow("Nationality", "nationality", "text", "E-mail", "email", "email")}

          <div className="mt-1 flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-[#9dc43b]" />
            <span className="font-semibold text-gray-500">Phone:</span>
            <span className="text-gray-700">{renderInput("phone", "tel")}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1.5 rounded-xl bg-[#e7f68f] px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-[#d4e87a]"
          >
            <Edit className="h-3.5 w-3.5" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1.5 rounded-xl border border-red-100 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
