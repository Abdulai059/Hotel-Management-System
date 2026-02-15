import { useParams } from "react-router-dom";
import AccountStatement from "../features/FrontDesk/Payment/AccountStatement";
import PaymentDetails from "../features/FrontDesk/Payment/PaymentDetails";
import { useBooking } from "../features/FrontDesk/useBooking";
import ExportBarButton from "../features/FrontDesk/GuestDetals/ExportBarButton";

export default function Payment() {
  const { booking, isLoading, error } = useBooking();

  console.log(booking);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading booking</div>;
  if (!booking) return null;

  return (
    <div>
      <PaymentDetails booking={booking} />
      <AccountStatement booking={booking} />

      <div className="bottom-0 z-10 mt-4">
        <ExportBarButton booking={booking} />
      </div>
    </div>
  );
}
