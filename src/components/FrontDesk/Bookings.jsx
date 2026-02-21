import BookingForm from "../features/FrontDesk/BookingForm/BookingForm";
import FrontDeskInfo from "../features/FrontDesk/FrontDeskInfo";

export default function Bookings() {
  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
        <FrontDeskInfo />
      </div>
      <div className="p-4 sm:p-6">
        <BookingForm />
      </div>
    </div>
  );
}
