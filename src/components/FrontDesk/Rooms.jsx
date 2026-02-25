import RoomNav from "../features/FrontDesk/RoomNav";
import RoomPage from "../features/FrontDesk/RoomPage";
import { useRooms } from "../features/FrontDesk/room/useRoomsQuery";

export default function Rooms() {
  const { data: rooms, isLoading, error } = useRooms();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <RoomNav />
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Loading rooms...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6">
        <RoomNav />
        <div className="flex items-center justify-center py-12">
          <div className="text-red-500">Error loading rooms: {error.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <RoomNav />
      <RoomPage rooms={rooms} />
    </div>
  );
}
