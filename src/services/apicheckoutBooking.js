import supabase from "./supabase";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function checkoutBooking(bookingId, roomId) {
  const today = new Date().toISOString().split("T")[0];

  const [{ error: roomError }, { error: bookingError }] = await Promise.all([
    supabase.from("rooms").update({ status: "AVAILABLE" }).eq("id", roomId),
    supabase.from("bookings").update({ status: "CHECKED_OUT", end_date: today }).eq("id", bookingId),
  ]);

  if (roomError) throw roomError;
  if (bookingError) throw bookingError;
}

export function useCheckout(bookingId) {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending } = useMutation({
    mutationFn: ({ bookingId, roomId }) => checkoutBooking(bookingId, roomId),
    onSuccess: () => {
      toast.success("Guest checked out successfully!");
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { checkout, isPending };
}
