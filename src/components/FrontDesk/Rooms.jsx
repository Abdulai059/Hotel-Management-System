import RoomNav from "../features/FrontDesk/RoomNav";
import RoomPage from "../features/FrontDesk/RoomPage";

export default function Rooms() {
  return (
    <div className="flex flex-col gap-6">
      <RoomNav />
      <RoomPage />
    </div>
  );
}
