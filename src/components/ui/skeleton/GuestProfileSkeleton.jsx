import { User } from "lucide-react";

const Shimmer = ({ className = "" }) => <div className={`animate-pulse rounded bg-gray-100 ${className}`} />;

const CardShell = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-gray-100 bg-white p-6 shadow-sm ${className}`}>{children}</div>
);

// ── ProfilePanel skeleton ────────────────────────────────────────────────────
function ProfilePanelSkeleton() {
  return (
    <CardShell>
      {/* Header */}
      <Shimmer className="mb-5 h-4 w-20" />

      {/* Avatar + name */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm bg-gray-100">
          <User size={28} className="text-gray-300" strokeWidth={2} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Shimmer className="h-4 w-32" />
          <Shimmer className="h-3 w-20" />
        </div>
      </div>

      <div className="my-4 h-px bg-gray-100" />

      {/* Phone / email */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="mb-2.5 flex items-center gap-2.5">
          <Shimmer className="h-8 w-8 rounded-lg" />
          <Shimmer className="h-3 w-40" />
        </div>
      ))}

      <div className="my-4 h-px bg-gray-100" />

      <Shimmer className="mb-3 h-4 w-36" />
      <div className="grid grid-cols-2 gap-x-2 gap-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-4 w-24" />
          </div>
        ))}
      </div>

      <div className="my-4 h-px bg-gray-100" />

      <Shimmer className="mb-3 h-4 w-28" />
      <Shimmer className="mb-3 h-5 w-24 rounded-sm" />
      <div className="grid grid-cols-2 gap-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-4 w-20" />
          </div>
        ))}
      </div>
    </CardShell>
  );
}

// ── BookingPanel skeleton ────────────────────────────────────────────────────
function BookingPanelSkeleton() {
  return (
    <CardShell>
      {/* Header */}
      <Shimmer className="mb-5 h-4 w-40" />

      {/* Status badge + button */}
      <div className="flex items-center gap-4 pb-4">
        <Shimmer className="h-6 w-24 rounded-full" />
        <Shimmer className="h-6 w-24 rounded-full" />
      </div>

      {/* Booking ID */}
      <Shimmer className="mb-1 h-7 w-52" />
      <Shimmer className="mb-5 h-3 w-36" />

      {/* 3-col grid fields */}
      <div className="mb-5 grid grid-cols-3 gap-x-2 gap-y-4">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="flex flex-col gap-1">
            <Shimmer className="h-3 w-16" />
            <Shimmer className="h-4 w-24" />
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mb-5">
        <Shimmer className="mb-2 h-3 w-12" />
        <Shimmer className="h-16 w-full rounded-xl" />
      </div>

      {/* Bottom 3-col section */}
      <div className="grid grid-cols-3 gap-3 border-t border-gray-100 pt-5">
        <div className="flex flex-col gap-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <Shimmer className="h-3 w-20" />
              <Shimmer className="h-4 w-28" />
            </div>
          ))}
        </div>
        <div>
          <Shimmer className="mb-2 h-3 w-24" />
          <div className="flex flex-col gap-2">
            {[...Array(3)].map((_, i) => (
              <Shimmer key={i} className="h-4 w-40" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Shimmer className="h-3 w-12" />
          <Shimmer className="h-4 w-8" />
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-5 flex justify-end gap-2.5">
        <Shimmer className="h-9 w-16 rounded-sm" />
        <Shimmer className="h-9 w-32 rounded-sm" />
      </div>
    </CardShell>
  );
}

// ── RoomInfoPanel skeleton ───────────────────────────────────────────────────
function RoomInfoPanelSkeleton() {
  return (
    <CardShell>
      <div className="mb-4 flex items-center justify-between">
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-3 w-16" />
      </div>
      {/* Room illustration */}
      <Shimmer className="mb-4 h-40 w-full rounded-sm" />
      {/* Feature chips */}
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <Shimmer key={i} className="h-4 w-16" />
        ))}
      </div>
    </CardShell>
  );
}

// ── PriceSummaryPanel skeleton ───────────────────────────────────────────────
function PriceSummaryPanelSkeleton() {
  return (
    <CardShell>
      {/* Title row */}
      <div className="mb-4 flex items-center gap-2.5">
        <Shimmer className="h-4 w-28" />
        <Shimmer className="h-5 w-12 rounded-full" />
      </div>

      {/* Price rows */}
      <div className="mb-4 flex flex-col gap-2.5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex justify-between">
            <div className="flex flex-col gap-1">
              <Shimmer className="h-3.5 w-28" />
              {i === 0 && <Shimmer className="h-3 w-36" />}
            </div>
            <Shimmer className="h-3.5 w-20" />
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between border-t border-gray-100 pt-3">
        <Shimmer className="h-5 w-20" />
        <Shimmer className="h-5 w-24" />
      </div>

      {/* Notes */}
      <div className="mt-3 flex flex-col gap-1.5">
        <Shimmer className="h-3 w-12" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-3/4" />
      </div>
    </CardShell>
  );
}

// ── Composed GuestProfileSkeleton ────────────────────────────────────────────
export default function GuestProfileSkeleton() {
  return (
    <div className="flex items-start justify-center bg-gray-50 p-8">
      <div className="grid w-full max-w-screen-xl gap-5" style={{ gridTemplateColumns: "280px 1fr 300px" }}>
        <ProfilePanelSkeleton />
        <BookingPanelSkeleton />
        <div className="flex flex-col gap-5">
          <RoomInfoPanelSkeleton />
          <PriceSummaryPanelSkeleton />
        </div>
      </div>
    </div>
  );
}
