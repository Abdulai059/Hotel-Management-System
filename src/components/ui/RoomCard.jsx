import { useState } from "react";
import { RoomStatus } from "@/hooks/types";
import { Icons } from "./constants";
import GuestTooltip from "./GuestTooltip";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  OCCUPIED: "bg-[#e7f68f] text-gray-800",
  AVAILABLE: "bg-[#d5f6e5] text-gray-800",
  RESERVED: "bg-[#d5f6e5] text-gray-800",
  MAINTENANCE: "bg-[#e5e7eb] text-gray-800",
};

const SHADOW_STYLES = {
  OCCUPIED: "shadow-[0_0_30px_rgba(231,246,143,0.8)]",
  AVAILABLE: "shadow-[0_0_30px_rgba(213,246,229,0.8)]",
  RESERVED: "shadow-[0_0_30px_rgba(213,246,229,0.8)]",
  MAINTENANCE: "shadow-[0_0_30px_rgba(229,231,235,0.8)]",
};

export default function RoomCard({ room, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!room) return null;

  const guest = room.guest ?? null;
  const isOccupied = room.status === RoomStatus.OCCUPIED;
  const statusStyle = STATUS_STYLES[room.status] ?? "bg-[#e5e7eb] text-gray-800";
  const shadowStyle = isHovered ? (SHADOW_STYLES[room.status] ?? "shadow-lg") : "shadow-sm";

  const handleClick = () => {
    onClick?.(room);
    if (room.guest?.id) navigate(`/app/fd/room/${room.guest.id}`);
  };

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isOccupied && isHovered && guest && <GuestTooltip guest={guest} booking={room} />}

      <button
        type="button"
        onClick={handleClick}
        className={`relative flex h-36 w-full flex-col items-center justify-center gap-1 overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 ${statusStyle} ${shadowStyle} ${isHovered ? "-translate-y-2 scale-105" : "scale-100"} active:scale-95`}
      >
        <div
          className={`absolute top-3 right-4 transition-all duration-300 ${isHovered ? "scale-110 opacity-60" : "opacity-30"}`}
        >
          {isOccupied ? <Icons.Users /> : <Icons.Bed />}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <span
            className={`mb-1 text-3xl font-black tracking-tighter transition-all duration-300 ${isHovered ? "scale-110" : ""}`}
          >
            {room.number}
          </span>

          <div className={`mb-2 h-px bg-gray-400/40 transition-all duration-300 ${isHovered ? "w-16" : "w-8"}`} />

          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">{room.type || "Standard"}</span>
        </div>

        <div
          className={`relative z-10 mt-2 rounded-full border border-gray-300/50 bg-white/40 backdrop-blur-md transition-all duration-300 ${isHovered ? "px-4 py-1.5" : "px-3 py-1"}`}
        >
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
            {room.status.replace("_", " ")}
          </span>
        </div>
      </button>
    </div>
  );
}
