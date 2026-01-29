import GuestNav from "../features/FrontDesk/GuestNav";
import GuestReservationsTable from "../features/FrontDesk/GuestReservationsTable";

export default function Guests() {
    return (
        <div className="flex flex-col gap-4">
            <GuestNav />
            <GuestReservationsTable />
        </div>
    )
}
