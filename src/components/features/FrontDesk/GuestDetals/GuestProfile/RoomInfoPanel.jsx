import { CardHeader } from "@/components/ui/FieldLabel";
import { BedDouble, Square, Users } from "lucide-react";

const RoomIllustration = () => (
  <div
    className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-sm"
    style={{ background: "linear-gradient(135deg, #f0fbe8, #e7f68f40)" }}
  >
    <img src="https://thumbs.dreamstime.com/b/hotel-room-beautiful-orange-sofa-included-43642330.jpg" alt="room" />
  </div>
);

export function RoomInfoPanel() {
  return (
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
}
