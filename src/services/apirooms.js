import { RoomStatus } from "@/hooks/types";
import { useQuery } from "@tanstack/react-query";
import supabase from "./supabase";

async function AvailableRooms() {
  const { data, error } = await supabase
    .from("rooms")
    .select(`id, room_number, room_name, status, room_types:room_type_id (id, name, base_price)`)
    .eq("status", RoomStatus.AVAILABLE)
    .order("room_number");

  if (error) throw error;
  return data;
}

export function useAvailableRooms() {
  const { data: rooms = [], isLoading: loading } = useQuery({
    queryKey: ["rooms", "available"],
    queryFn: AvailableRooms,
  });

  return { rooms, loading };
}
