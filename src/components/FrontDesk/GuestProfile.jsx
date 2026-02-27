import { useBooking } from "../features/FrontDesk/useBooking";
import ActionButtons from "../features/FrontDesk/GuestDetals/ActionButtons";
import { useParams } from "react-router-dom";
import { ProfilePanel } from "../features/FrontDesk/GuestDetals/GuestProfile/ProfilePanel";
import { RoomInfoPanel } from "../features/FrontDesk/GuestDetals/GuestProfile/RoomInfoPanel";
import { BookingPanel } from "../features/FrontDesk/GuestDetals/GuestProfile/BookingPanel";
import { PriceSummaryPanel } from "../features/FrontDesk/GuestDetals/GuestProfile/PriceSummaryPanel";
import { useQueryClient } from "@tanstack/react-query";

export default function GuestProfile() {
  const { id } = useParams();
  const { booking, isLoading, error } = useBooking(id);
  const queryClient = useQueryClient();

  const handleRoomAssigned = () => {
    // Refresh the booking data to reflect the changes
    queryClient.invalidateQueries(["booking", id]);
  };

  return (
    <>
      <div className="flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-screen-6xl grid w-full gap-5" style={{ gridTemplateColumns: "280px 1fr 300px" }}>
          <ProfilePanel booking={booking} />
          <BookingPanel booking={booking} onRoomAssigned={handleRoomAssigned} />
          <div className="flex flex-col gap-5">
            <RoomInfoPanel />
            <PriceSummaryPanel booking={booking} />
          </div>
        </div>
      </div>
      <span className="bg-gray-50">
        <ActionButtons booking={booking} />
      </span>
    </>
  );
}
