import { RoomStatus } from "@/hooks/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "./supabase";

async function assignRoom({ booking, room }) {
  // Validate inputs
  if (!booking?.id || !room?.id) {
    throw new Error("Invalid booking or room data");
  }

  // Step 1: Update room status to OCCUPIED
  const { error: roomError } = await supabase.from("rooms").update({ status: RoomStatus.OCCUPIED }).eq("id", room.id);

  if (roomError) {
    throw roomError;
  }

  // Step 2: Update booking status to CHECKED_IN and assign room
  const bookingUpdate = { status: "CHECKED_IN" };

  // Only update room_id if it's different from current
  if (booking.room_id !== room.id) {
    bookingUpdate.room_id = room.id;
  }

  const { error: bookingError } = await supabase.from("bookings").update(bookingUpdate).eq("id", booking.id);

  if (bookingError) {
    // Rollback room status on booking update failure
    await supabase.from("rooms").update({ status: RoomStatus.AVAILABLE }).eq("id", room.id);
    throw bookingError;
  }

  return room;
}

export function useAssignRoom({ booking, onAssignRoom, onClose }) {
  const queryClient = useQueryClient();

  const { mutate: assign, isPending: assigning } = useMutation({
    mutationFn: (room) => assignRoom({ booking, room }),
    onSuccess: (room) => {
      toast.success(`Room ${room.room_number} assigned successfully!`);
      queryClient.invalidateQueries({ queryKey: ["rooms", "available"] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      onAssignRoom?.(room);
      onClose();
    },
    onError: (error) => {
      if (error.code === "22P02") {
        toast.error("Invalid room ID format. Please try again.");
      } else if (error.message?.includes("Invalid booking or room data")) {
        toast.error("Invalid booking or room information.");
      } else {
        toast.error(`Failed to assign room: ${error.message || "Please try again."}`);
      }
    },
  });

  return { assign, assigning };
}
