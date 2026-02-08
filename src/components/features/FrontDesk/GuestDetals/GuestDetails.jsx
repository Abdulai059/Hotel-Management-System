import { formatDate } from "@/utils/dateHelpers";
import { Phone, Edit, Trash2 } from "lucide-react";

export default function GuestDetails({ booking, isEditing, handleInputChange, onEdit, onDelete }) {
  const guest = booking.guests || {};
  console.log("Guest info:", guest);

  const dobFormatted = formatDate(booking.guest?.date_of_birth);

  const renderInput = (field, type = "text") => {
    const value = guest[field] || "";
    if (isEditing) {
      if (type === "select") {
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange("guest", field, e.target.value)}
            className="rounded border border-gray-200 bg-gray-50 p-1 text-sm outline-none"
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
          className="rounded border border-gray-200 bg-gray-50 p-1 text-sm outline-none"
        />
      );
    }
    return value;
  };

  const renderRow = (label1, field1, type1, label2, field2, type2) => {
    const value1 = guest[field1] || "";
    const value2 = guest[field2] || "";

    return (
      <div className="mb-1 flex justify-between text-sm">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-600">{label1}:</span>
          <span className="text-slate-500">{renderInput(field1, type1)}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-slate-600">{label2}:</span>
          <span className="text-slate-500">
            {type2 === "date" ? formatDate(value2)?.full : renderInput(field2, type2)}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-400 to-[#666666] p-6">
      <h2 className="mb-4 text-lg font-semibold text-white uppercase">Guest Details</h2>

      <div className="w-full rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <svg className="h-12 w-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 110-8 4 4 0 010 8zm0 2c-5.33 0-8 2.67-8 8v2h16v-2c0-5.33-2.67-8-8-8z" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl font-bold text-blue-600">{guest.full_name || ""}</span>
            <span className="text-sm font-semibold text-gray-600">{guest.pId || ""}</span>
          </div>
        </div>

        <div className="flex flex-col text-sm">
          <div className="mb-1">
            <span className="font-semibold text-slate-600">Address:</span>{" "}
            <span className="text-slate-500">{renderInput("address")}</span>
          </div>

          {renderRow("City", "city", "text", "State", "state", "text")}
          {renderRow("Country", "country", "text", "Zipcode", "zip_code", "text")}
          {renderRow("Gender", "gender", "select", "DOB", "date_of_birth", "date", dobFormatted?.full)}
          {renderRow("Nationality", "nationality", "text", "E-mail", "email", "email")}

          <div className="mt-1 flex items-center gap-1">
            <Phone className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-slate-600">Phone:</span>
            <span className="text-slate-500">{renderInput("phone", "tel")}</span>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t pt-4">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 rounded border px-3 py-1 text-sm text-gray-500 hover:text-gray-700"
          >
            <Edit className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-1 rounded border px-3 py-1 text-sm text-gray-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
