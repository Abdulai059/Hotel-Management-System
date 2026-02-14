import { MoreVertical } from "lucide-react";

function CustomerFeedback() {
  const feedbackData = [
    { name: "Mark", comment: "Food could be better.", room: "A201" },
    { name: "Christian", comment: "Facilities are not enough for amount paid.", room: "A101" },
    { name: "Alexander", comment: "Room cleaning could be better.", room: "A301" },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between sm:mb-6">
        <h2 className="text-base font-semibold text-gray-800 sm:text-lg">Customer Feedback</h2>

        <button className="text-gray-400 hover:text-gray-600" aria-label="More options">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {feedbackData.map(({ name, comment, room }) => (
          <FeedbackItem key={room} name={name} comment={comment} room={room} />
        ))}
      </div>
    </div>
  );
}

function FeedbackItem({ name, comment, room }) {
  return (
    <div className="border-b border-gray-100 pb-3 last:border-b-0 sm:pb-4">
      <div className="mb-1.5 flex items-center justify-between sm:mb-2">
        <span className="text-sm font-medium text-gray-800 sm:text-base">{name}</span>
        <span className="text-xs text-gray-500 sm:text-sm">{room}</span>
      </div>
      <p className="text-xs text-gray-600 sm:text-sm">{comment}</p>
    </div>
  );
}

export default CustomerFeedback;