import GuestNav from "../features/FrontDesk/GuestNav";
import GuestsTable from "../features/FrontDesk/GuestsTable";

export default function Guests() {
  return (
    <div className="flex flex-col gap-6">
      <GuestNav />

      <div className="w-full">
        <GuestsTable />
      </div>
    </div>
  );
}
