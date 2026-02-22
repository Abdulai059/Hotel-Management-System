import { Edit, Mail } from "lucide-react";

export default function EmailSending({ actions }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm ring-1 ring-gray-100">
      <div className="flex items-center justify-between border-b border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <Mail size={15} className="text-[#9dc43b]" />
          <span className="text-sm font-medium text-gray-700">Confirmation</span>
        </div>
        <button className="rounded-xl bg-[#e7f68f] px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-[#d4e87a]">
          Send Email
        </button>
      </div>

      {actions.map((label) => (
        <div
          key={label}
          className="flex cursor-pointer items-center justify-between border-b border-gray-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-gray-50"
        >
          <span className="text-sm text-gray-600">{label}</span>
          <Edit size={14} className="text-gray-400 hover:text-[#9dc43b]" />
        </div>
      ))}

      <div className="flex items-center justify-between border-t border-gray-100 p-4">
        <span className="text-sm font-medium text-gray-700">Guest Preferences</span>
        <button className="bg-primary rounded-xl px-3 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:bg-[#c0ecd5]">
          View
        </button>
      </div>
    </div>
  );
}
