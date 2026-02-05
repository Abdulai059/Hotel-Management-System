import BookingForm from "../features/FrontDesk/BookingForm/BookingForm";
import FrontDeskInfo from "../features/FrontDesk/FrontDeskInfo";

export default function Bookings() {
  return (
    <div>
      <div className="sticky top-0 z-50 mb-0 border-b border-slate-200/50 bg-white/70 pt-2 pb-4 backdrop-blur-xl">
        <FrontDeskInfo />
      </div>
      <BookingForm />
    </div>
  );
}
