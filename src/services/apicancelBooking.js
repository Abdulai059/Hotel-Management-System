import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "./supabase";

async function cancelBooking(bookingId) {
  const { error } = await supabase.from("bookings").update({ status: "CANCELLED" }).eq("id", bookingId);

  if (error) throw error;
}

export function useCancelBooking(bookingId) {
  const queryClient = useQueryClient();

  const { mutate: cancel, isPending } = useMutation({
    mutationFn: (bookingId) => cancelBooking(bookingId),
    onSuccess: () => {
      toast.success("Booking cancelled");
      // Invalidate both the specific booking and general bookings queries
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { cancel, isPending };
}
