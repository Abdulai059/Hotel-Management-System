import { CardHeader, FieldLabel, FieldValue } from "@/components/ui/FieldLabel";
import { fullformatDate } from "@/utils/dateHelpers";
import { Check } from "lucide-react";
import { useState } from "react";
import AssignRoomModal from "@/components/ui/AssignRoomModal";
import toast from "react-hot-toast";
import { useCheckout } from "@/services/apicheckoutBooking";
import { useCancelBooking } from "@/services/apicancelBooking";

const STATUS_STYLES = {
  "checked-in": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "checked-out": "bg-gray-100 text-gray-600 border-gray-200",
  unconfirmed: "bg-blue-100 text-blue-700 border-blue-200",
  cancelled: "bg-red-100 text-red-600 border-red-200",
};

const TERMINAL_STATUSES = ["checked-out", "cancelled"];

const amenities = ["Complimentary breakfast", "Free Wi-Fi", "Access to gym and pool"];

export function BookingPanel({ booking, onRoomAssigned }) {
  const [showAssignModal, setShowAssignModal] = useState(false);

  const { checkout, isPending: checkingOut } = useCheckout(booking?.id);
  const { cancel, isPending: cancelling } = useCancelBooking(booking?.id);

  if (!booking) return null;

  const status = booking.status?.toLowerCase().replace(/_/g, "-");
  const isTerminal = TERMINAL_STATUSES.includes(status);

  const handleCheckout = () => {
    if (!booking?.rooms?.id) return toast.error("No room assigned to this booking");
    if (!window.confirm("Confirm checkout for this guest?")) return;
    checkout({ bookingId: booking.id, roomId: booking.rooms.id });
  };

  const handleCancel = () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    cancel(booking.id);
  };

  const renderStatusButton = () => {
    if (isTerminal) return null;

    if (status === "checked-in") {
      return (
        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          className="rounded-full border border-pink-600 bg-pink-600 px-3 py-1 text-xs font-semibold text-white uppercase hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {checkingOut ? "Checking out..." : "Checkout"}
        </button>
      );
    }

    if (status === "unconfirmed" || status === "reserved") {
      return (
        <button
          onClick={() => setShowAssignModal(true)}
          className="rounded-full border border-purple-600 bg-purple-600 px-3 py-1 text-xs font-semibold text-white uppercase hover:bg-purple-700"
        >
          Assign Room
        </button>
      );
    }

    return null;
  };

  const roomDetails = booking?.rooms;
  const nightlyRate = Number(booking.room_rate_snapshot) || 0;
  const numberOfNights = Number(booking.num_nights) || 0;

  const bookingInformationFields = [
    { label: "Room Type", value: roomDetails?.room_types?.name ?? "Not Assigned" },
    { label: "Room Number", value: roomDetails?.room_number ?? "Not Assigned" },
    {
      label: "Price",
      value: (
        <>
          <strong>GH₵ {nightlyRate.toFixed(2)}</strong>
          <span className="text-xs font-normal text-gray-400"> /night</span>
        </>
      ),
    },
    { label: "Guests", value: `${booking.num_guests ?? 1} Adults` },
    { label: "Special Requests", value: booking.special_requests ?? "None" },
    { label: "", value: "" },
    { label: "Check In", value: booking.start_date ? fullformatDate(booking.start_date)?.full : "—" },
    { label: "Check Out", value: booking.end_date ? fullformatDate(booking.end_date)?.full : "—" },
    { label: "Duration", value: `${numberOfNights} nights` },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <CardHeader title="Booking Information" />

      <div className="flex items-center justify-start gap-4 pb-4">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase ${STATUS_STYLES[status] ?? "border-amber-200 bg-amber-100 text-amber-700"}`}
        >
          <Check size={12} strokeWidth={2.5} />
          {booking.status?.replace(/_/g, " ") ?? "Confirmed"}
        </span>
        <span>{renderStatusButton()}</span>
      </div>

      <p className="mb-1 text-2xl font-bold text-gray-900">
        Booking ID: <span className="text-gray-900">{booking.resId ?? booking.id}</span>
      </p>
      <p className="mb-5 text-xs text-gray-400">{booking.created_at ? fullformatDate(booking.created_at)?.full : ""}</p>

      <div className="mb-5 grid grid-cols-3 gap-x-2 gap-y-4">
        {bookingInformationFields.map((field, index) => (
          <div key={field.label || index}>
            <FieldLabel>{field.label}</FieldLabel>
            <FieldValue>{field.value}</FieldValue>
          </div>
        ))}
      </div>

      <div className="mb-5">
        <FieldLabel>Notes</FieldLabel>
        <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm leading-relaxed text-gray-700">
          Guest requested extra pillows and towels. Ensure room service is available upon arrival.
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-5">
        <div>
          <FieldLabel>Loyalty Program</FieldLabel>
          <FieldValue>Platinum Member</FieldValue>
          <div className="mt-3">
            <FieldLabel>Transportation</FieldLabel>
            <FieldValue>Airport pickup arranged</FieldValue>
          </div>
        </div>
        <div>
          <FieldLabel>Special Amenities</FieldLabel>
          <ul className="mt-1 flex flex-col gap-1.5">
            {amenities.map((a) => (
              <li key={a} className="flex items-center gap-1.5 text-sm text-gray-700">
                <Check size={13} className="shrink-0 text-[#9dc43b]" strokeWidth={2.5} />
                {a}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <FieldLabel>Extras</FieldLabel>
          <FieldValue>—</FieldValue>
        </div>
      </div>

      {!isTerminal && (
        <div className="mt-5 flex justify-end gap-2.5">
          <button className="rounded-sm border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
            Edit
          </button>
          <button
            onClick={handleCancel}
            disabled={cancelling}
            className="rounded-sm border border-red-100 bg-red-100 px-5 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelling ? "Cancelling..." : "Cancel Booking"}
          </button>
        </div>
      )}

      <AssignRoomModal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        booking={booking}
        onAssignRoom={(assignedRoom) => onRoomAssigned?.(assignedRoom)}
      />
    </div>
  );
}
