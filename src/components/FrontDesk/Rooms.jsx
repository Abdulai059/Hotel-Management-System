import RoomNav from "../features/FrontDesk/RoomNav";
import RoomPage from "../features/FrontDesk/RoomPage";
import { useRooms } from "../features/FrontDesk/room/useRoomsQuery";
import RoomPageSkeleton from "../ui/skeleton/RoomPageSkeleton";

export default function Rooms() {
  const { data: rooms, isLoading, error } = useRooms();

  if (isLoading)
    return (
      <div className="flex flex-col gap-6">
        <RoomNav />
        <RoomPageSkeleton />
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      <RoomNav />
      <RoomPage rooms={rooms} />
    </div>
  );
}
