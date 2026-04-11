import { useNavigate } from "react-router-dom";

export default function ConfirmationScreen({ formData, nights, onNewBooking }) {
  const navigate = useNavigate();

  const roomType = formData?.roomType || "Not Assigned";
  const guestName = formData?.fullName || "Guest";

  return (
    <div className="py-8 text-center">
      <div className="animate-in fade-in mx-auto max-w-2xl rounded-lg border border-slate-100 bg-white p-8 shadow-sm duration-500">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
            <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-3xl font-bold text-slate-800">Booking Confirmed</h2>

        {/* Message */}
        <p className="mb-8 leading-relaxed text-slate-500">
          Booking has been successfully created for <span className="font-semibold text-rose-500">{guestName}</span>.{" "}
          Room Type: <span className="font-semibold text-amber-600">{roomType}</span>, Duration:{" "}
          <span className="font-semibold text-sky-600">
            {nights} {nights === 1 ? "night" : "nights"}
          </span>
          .
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={onNewBooking}
            className="rounded-sm bg-rose-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-rose-600"
          >
            New Booking
          </button>

          <button
            onClick={() => navigate("/app/fd/reservations")}
            className="rounded-sm bg-sky-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-sky-600"
          >
            View Guests
          </button>

          <button
            onClick={() => navigate("/app/fd")}
            className="rounded-sm bg-slate-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-slate-800"
          >
            Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
