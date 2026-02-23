import { useState } from "react";
import { Phone, Mail, Star, Check, Square, BedDouble, Users, User } from "lucide-react";
import { useBooking } from "../features/FrontDesk/useBooking";
import { formatDate, fullformatDate } from "@/utils/dateHelpers";
import ActionButtons from "../features/FrontDesk/GuestDetals/ActionButtons";

const Divider = () => <div className="my-4 h-px bg-gray-200" />;

const CardHeader = ({ title, right }) => (
  <div className="mb-5 flex items-center justify-between">
    <span className="text-sm font-bold tracking-widest text-gray-700 uppercase">{title}</span>
    {right ?? <span className="cursor-pointer text-xl tracking-widest text-gray-300">···</span>}
  </div>
);

const FieldLabel = ({ children }) => (
  <p className="mb-1 text-[11px] tracking-wide text-gray-400 uppercase">{children}</p>
);

const FieldValue = ({ children, className = "" }) => (
  <p className={`text-sm font-medium text-gray-800 ${className}`}>{children}</p>
);

const Avatar = () => (
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#e7f68f]">
    <User size={28} className="text-[#5a7a1e]" strokeWidth={2} />
  </div>
);

const RoomIllustration = () => (
  <div
    className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-sm"
    style={{ background: "linear-gradient(135deg, #f0fbe8, #e7f68f40)" }}
  >
    <img src="https://thumbs.dreamstime.com/b/hotel-room-beautiful-orange-sofa-included-43642330.jpg" alt="room" />
  </div>
);

const ProfilePanel = ({ booking }) => {
  const guest = booking?.guests || {};

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <CardHeader title="Profile" />

      <div className="mb-5 flex items-center gap-3">
        <Avatar />
        <div>
          <p className="text-base leading-tight font-bold text-gray-900">{guest.full_name || "—"}</p>
          <p className="mt-0.5 text-xs text-gray-400">{guest.pId || guest.passport_no || "—"}</p>
        </div>
      </div>

      <Divider />

      <div className="mb-2.5 flex items-center gap-2.5 text-sm text-gray-700">
        <span className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-emerald-700">
          <Phone size={14} />
        </span>
        {guest.phone || "—"}
      </div>

      <div className="flex items-center gap-2.5 text-sm text-gray-700">
        <span className="bg-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-700">
          <Mail size={14} />
        </span>
        {guest.email || "—"}
      </div>

      <Divider />

      <p className="mb-3 text-sm font-semibold text-gray-900">Personal Information</p>

      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        <div>
          <FieldLabel>Date of Birth</FieldLabel>
          <FieldValue>{guest.date_of_birth ? formatDate(guest.date_of_birth)?.full : "—"}</FieldValue>
        </div>
        <div>
          <FieldLabel>Gender</FieldLabel>
          <FieldValue>{guest.gender || "—"}</FieldValue>
        </div>
        <div>
          <FieldLabel>Nationality</FieldLabel>
          <FieldValue>{guest.nationality || "—"}</FieldValue>
        </div>
        <div>
          <FieldLabel>Passport No.</FieldLabel>
          <FieldValue>{guest.passport_no || guest.pId || "—"}</FieldValue>
        </div>
      </div>

      <Divider />

      <p className="mb-3 text-sm font-semibold text-gray-900">Loyalty Program</p>
      <FieldLabel>Membership Status</FieldLabel>
      <span className="mb-3 inline-flex items-center gap-1 rounded-sm bg-[#e7f68f] px-3 py-1 text-xs font-bold text-gray-700">
        Platinum Member
      </span>
      <div className="mt-1 grid grid-cols-2 gap-2">
        <div>
          <FieldLabel>Points Balance</FieldLabel>
          <FieldValue>15,000 points</FieldValue>
        </div>
        <div>
          <FieldLabel>Tier Level</FieldLabel>
          <div className="flex items-center gap-1 text-sm font-medium text-gray-800">
            <Star size={13} stroke="#9dc43b" fill="none" />
            Elite
          </div>
        </div>
      </div>
    </div>
  );
};

function BookingPanel({ booking }) {
  const [cancelled, setCancelled] = useState(false);

  if (!booking) return null;

  const roomDetails = booking?.rooms;
  const roomTypeName = roomDetails?.room_types?.name ?? "Not Assigned";
  const roomNumber = roomDetails?.room_number ?? "Not Assigned";
  const nightlyRate = Number(booking.room_rate_snapshot) || 0;
  const numberOfNights = Number(booking.num_nights) || 0;
  const formattedCheckInDate = booking.start_date ? fullformatDate(booking.start_date)?.full : "—";
  const formattedCheckOutDate = booking.end_date ? fullformatDate(booking.end_date)?.full : "—";
  const formattedCreatedDate = booking.created_at ? fullformatDate(booking.created_at)?.full : "";
  const bookingStatus = booking.status ? booking.status.replace(/_/g, " ") : "Confirmed";

  const bookingInformationFields = [
    { label: "Room Type", value: roomTypeName },
    { label: "Room Number", value: roomNumber },
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
    { label: "Check In", value: formattedCheckInDate },
    { label: "Check Out", value: formattedCheckOutDate },
    { label: "Duration", value: `${numberOfNights} nights` },
  ];

  const amenities = ["Complimentary breakfast", "Free Wi-Fi", "Access to gym and pool"];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <CardHeader title="Booking Information" />

      <span className="bg-primary mb-2.5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-emerald-700">
        <Check size={12} strokeWidth={2.5} />
        {bookingStatus}
      </span>

      <p className="mb-1 text-2xl font-bold text-gray-900">
        Booking ID: <span className="text-gray-900">{booking.resId ?? booking.id}</span>
      </p>
      <p className="mb-5 text-xs text-gray-400">{formattedCreatedDate}</p>

      <div className="mb-5 grid grid-cols-3 gap-x-2 gap-y-4">
        {bookingInformationFields.map((field) => (
          <div key={field.label}>
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

      <div className="mt-5 flex justify-end gap-2.5">
        <button className="rounded-sm border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50">
          Edit
        </button>
        <button
          onClick={() => setCancelled(!cancelled)}
          className="rounded-sm border border-red-100 bg-red-100 px-5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-red-50"
        >
          {cancelled ? "Undo Cancel" : "Cancel Booking"}
        </button>
      </div>
    </div>
  );
}

const RoomInfoPanel = () => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <CardHeader
      title="Room Info"
      right={
        <a href="#" className="text-xs font-semibold text-gray-500 hover:underline">
          View Detail
        </a>
      }
    />
    <RoomIllustration />
    <div className="flex flex-wrap gap-3 text-xs text-gray-400">
      {[
        { icon: <Square size={13} />, label: "35 m²" },
        { icon: <BedDouble size={13} />, label: "King Bed" },
        { icon: <Users size={13} />, label: "2 guests" },
      ].map(({ icon, label }) => (
        <span key={label} className="flex items-center gap-1">
          {icon} {label}
        </span>
      ))}
    </div>
  </div>
);

const PriceSummaryPanel = ({ booking }) => {
  if (!booking) return null;

  const numNights = Number(booking.num_nights) || 0;
  const roomRate = Number(booking.room_rate_snapshot) || 0;

  const roomAndOffer = roomRate;
  const extras = Number(booking.payments?.addOns) || 0;
  const vat = Number(booking.payments?.roomTax) || 0;
  const cityTax = 49.5;

  const totalPrice = roomAndOffer + extras + vat + cityTax;

  const rows = [
    {
      label: "Room and offer",
      amount: `GH₵ ${roomAndOffer.toFixed(2)}`,
      info: `${numNights} nights × ₵ ${roomRate.toFixed(2)}`,
    },
    {
      label: "Extras",
      amount: `GH₵ ${extras.toFixed(2)}`,
    },
    {
      label: "VAT",
      amount: `GH₵ ${vat.toFixed(2)}`,
    },
    {
      label: "City Tax",
      amount: `GH₵ ${cityTax.toFixed(2)}`,
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <p className="text-sm font-semibold text-gray-900">Price Summary</p>
        <span className="rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-800">Paid</span>
      </div>

      <div className="mb-4 flex flex-col gap-2.5">
        {rows.map(({ label, amount, info }) => (
          <div key={label} className="flex justify-between text-sm text-gray-500">
            <div className="flex flex-col">
              <span className="text-gray-500">{label}</span>
              {info && <span className="mb-1 text-xs text-gray-400">{info}</span>}
            </div>
            <span>{amount}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between border-t border-gray-100 pt-3 text-[15px] font-bold text-gray-900">
        <span>Total Price</span>
        <span>GH₵ {totalPrice.toFixed(2)}</span>
      </div>

      <div className="mt-3">
        <FieldLabel>Notes</FieldLabel>
        <p className="text-xs leading-relaxed text-gray-400">
          Invoice sent to corporate account; payment confirmed by BIG Corporation
        </p>
      </div>
    </div>
  );
};

export default function GuestProfile() {
  const { booking, isLoading, error } = useBooking();

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-screen-6xl grid w-full gap-5" style={{ gridTemplateColumns: "280px 1fr 300px" }}>
          <ProfilePanel booking={booking} />
          <BookingPanel booking={booking} />
          <div className="flex flex-col gap-5">
            <RoomInfoPanel />
            <PriceSummaryPanel booking={booking} />
          </div>
        </div>
      </div>
      <span className="bg-gray-50">
        <ActionButtons booking={booking} />
      </span>
    </>
  );
}
