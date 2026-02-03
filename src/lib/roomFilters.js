import { RoomStatus } from "@/hooks/types";

export const FILTER_ALL = "ALL";

export function filterRooms(rooms, filterStatus, searchQuery) {
  const query = searchQuery.trim().toLowerCase();

  return rooms.filter((room) => {
    const matchesStatus = filterStatus === FILTER_ALL || room.status === filterStatus;

    const matchesSearch = room.number.toLowerCase().includes(query) || room.type.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });
}

export function computeStats(rooms = []) {
  const total = rooms.length;

  const occupied = rooms.filter((r) => r.status === RoomStatus.OCCUPIED).length;

  const available = rooms.filter((r) => r.status === RoomStatus.AVAILABLE).length;

  const maintenance = rooms.filter(
    (r) => r.status === RoomStatus.MAINTENANCE || r.status === RoomStatus.CLEANING,
  ).length;

  return {
    total,
    occupied,
    available,
    maintenance,
    occupancyRate: total ? Math.round((occupied / total) * 100) : 0,
  };
}

export const RoomType = {
  SINGLE: "Single",
  DOUBLE: "Double",
  DELUXE: "Deluxe",
  SUITE: "Suite",
  PENTHOUSE: "Penthouse",
};
