import { useState } from "react";
import { RoomStatus } from "@/hooks/types";
import { Icons, STATUS_COLORS } from "./constants";
import GuestTooltip from "./GuestTooltip";

export default function RoomCard({ room, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const isOccupied = room.status === RoomStatus.OCCUPIED;

  const getHeatmapStyle = () => {
    const baseStyles = "relative overflow-hidden transition-all duration-300";

    switch (room.status) {
      case RoomStatus.AVAILABLE:
        return `${baseStyles} bg-gradient-to-br from-emerald-400 to-emerald-600 ${
          isHovered ? "shadow-[0_0_30px_rgba(16,185,129,0.6)]" : "shadow-lg"
        }`;
      case RoomStatus.OCCUPIED:
        return `${baseStyles} bg-gradient-to-br from-rose-500 to-rose-700 ${
          isHovered ? "shadow-[0_0_30px_rgba(244,63,94,0.6)]" : "shadow-lg"
        }`;
      case RoomStatus.MAINTENANCE:
        return `${baseStyles} bg-gradient-to-br from-amber-400 to-amber-600 ${
          isHovered ? "shadow-[0_0_30px_rgba(251,191,36,0.6)]" : "shadow-lg"
        }`;
      default:
        return `${baseStyles} bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg`;
    }
  };

  return (
    <div className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {isOccupied && isHovered && room.guest && <GuestTooltip guest={room.guest} />}

      <button
        type="button"
        onClick={() => onClick?.(room)}
        className={`flex h-36 w-full flex-col items-center justify-center gap-1 rounded-lg border-2 border-white/20 text-white ${getHeatmapStyle()} ${
          isHovered ? "-translate-y-2 scale-105" : "scale-100"
        } group active:scale-95`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : ""
          }`}
        />

        {room.status === RoomStatus.AVAILABLE && (
          <div className="absolute inset-0 animate-pulse rounded-lg bg-white/10" />
        )}

        <div
          className={`absolute top-3 right-4 transition-all duration-300 ${
            isHovered ? "scale-110 opacity-80" : "opacity-40"
          }`}
        >
          {isOccupied ? <Icons.Users /> : <Icons.Bed />}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <span
            className={`mb-1 text-3xl font-black tracking-tighter transition-all duration-300 ${
              isHovered ? "scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "drop-shadow-md"
            }`}
          >
            {room.number}
          </span>

          <div className={`mb-2 h-px bg-white/40 transition-all duration-300 ${isHovered ? "w-16" : "w-8"}`} />

          <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-90 drop-shadow-sm">
            {room.type}
          </span>
        </div>

        <div
          className={`relative z-10 mt-2 rounded-full border backdrop-blur-md transition-all duration-300 ${
            isHovered ? "border-white/30 bg-white/20 px-4 py-1.5" : "border-white/10 bg-white/10 px-3 py-1"
          }`}
        >
          <span className="text-[10px] font-bold tracking-wider uppercase opacity-90">
            {room.status === RoomStatus.AVAILABLE && (
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
            )}
            {room.status.replace("_", " ")}
          </span>
        </div>

        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-10">
          <div
            className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent"
            style={{
              backgroundSize: "20px 20px",
              backgroundImage: `linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)`,
            }}
          />
        </div>
      </button>
    </div>
  );
}
