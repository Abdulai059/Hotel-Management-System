import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import supabase from "./supabase";

async function checkoutBooking(bookingId, roomId) {
  const { error: roomError } = await supabase.from("rooms").update({ status: "AVAILABLE" }).eq("id", roomId);

  if (roomError) throw roomError;

  const { error: bookingError } = await supabase.from("bookings").update({ status: "CHECKED_OUT" }).eq("id", bookingId);

  if (bookingError) throw bookingError;
}

export function useCheckout(bookingId) {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: ({ bookingId, roomId }) => checkoutBooking(bookingId, roomId),
    onSuccess: () => {
      toast.success("Guest checked out successfully!");
      // Invalidate both the specific booking and general bookings queries
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isPending };
}
