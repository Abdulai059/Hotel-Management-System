import { CardHeader, FieldLabel, FieldValue } from "@/components/ui/FieldLabel";
import { formatDate } from "@/utils/dateHelpers";
import { Mail, Phone, Star, User } from "lucide-react";

const Divider = () => <div className="my-4 h-px bg-gray-200" />;

const Avatar = () => (
  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-[#e7f68f]">
    <User size={28} className="text-[#5a7a1e]" strokeWidth={2} />
  </div>
);

export function ProfilePanel({ booking }) {
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
}
