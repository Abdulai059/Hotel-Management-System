import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "@/services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending } = useMutation({
    mutationFn: ({ guestData, bookingData }) => createBookingApi(guestData, bookingData),

    onSuccess: (data) => {
      toast.success("Booking created successfully");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createBooking, isPending };
}
