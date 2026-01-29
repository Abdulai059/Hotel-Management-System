import RoomNav from "../features/FrontDesk/RoomNav";
import RoomTable from "../features/FrontDesk/RoomTable";

export default function Rooms() {
  return (
    <div className="flex flex-col gap-6">
      <RoomNav />
      <RoomTable />
    </div>
  )
}
