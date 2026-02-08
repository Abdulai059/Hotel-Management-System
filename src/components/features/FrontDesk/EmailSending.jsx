import { Edit } from "lucide-react";

export default function EmailSending({ actions }) {
  return (
    <div className="divide-y rounded-lg border-2 border-gray-300 bg-white">
      <div className="flex items-center justify-between border-gray-500 p-4">
        <span className="text-gray-600">Confirmation</span>
        <button className="font-medium text-blue-600 hover:text-blue-700">Send Confirmation Email</button>
      </div>

      {actions.map((label) => (
        <div
          key={label}
          className="flex cursor-pointer items-center justify-between border-gray-300 p-2 hover:bg-gray-50"
        >
          <span className="text-gray-600">{label}</span>
          <Edit size={18} className="text-gray-500" />
        </div>
      ))}

      <div className="flex items-center justify-between p-4">
        <span className="text-gray-600">Guest Preferences</span>
        <button className="font-medium text-blue-600 hover:text-blue-700">View</button>
      </div>
    </div>
  );
}
