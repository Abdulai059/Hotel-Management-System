import { useState } from "react";
import { RoomStatus } from "@/hooks/types";
import { Icons, STATUS_COLORS } from "./constants";
import GuestTooltip from "./GuestTooltip";

export default function RoomCard({ room, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const isOccupied = room.status === RoomStatus.OCCUPIED;

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isOccupied && isHovered && room.guest && <GuestTooltip guest={room.guest} />}

      <button
        type="button"
        onClick={() => onClick(room)}
        className={`flex h-36 w-full flex-col items-center justify-center gap-1 rounded-sm border-2 transition-all duration-500 ease-out ${STATUS_COLORS[room.status]} ${isHovered ? "-translate-y-2 scale-105 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" : "scale-100 shadow-sm"} group overflow-hidden text-white active:scale-95`}
      >
        <div className="absolute top-3 right-4 opacity-30 transition-opacity duration-300 group-hover:opacity-60">
          {isOccupied ? <Icons.Users /> : <Icons.Bed />}
        </div>

        <div className="flex flex-col items-center">
          <span className="mb-1 text-3xl font-black tracking-tighter drop-shadow-md">{room.number}</span>
          <div className="mb-2 h-px w-8 bg-white/30 transition-all duration-300 group-hover:w-12" />
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90">{room.type}</span>
        </div>

        <div className="mt-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 backdrop-blur-md">
          <span className="flex items-center gap-1.5 text-[9px] font-black tracking-tighter uppercase">
            {room.status === RoomStatus.AVAILABLE && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            )}
            {room.status.replace("_", " ")}
          </span>
        </div>
      </button>
    </div>
  );
}
