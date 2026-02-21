import BookingStats from "../features/FrontDesk/BookingStats";
import DashboardTopNav from "../features/FrontDesk/DashboardTopNav";
import ReservationsChart from "../features/charts/ReservationsChart";
import RoomType from "../features/FrontDesk/RoomType";
import Stats from "../features/FrontDesk/Stats";
import BookingList from "../features/charts/BookingList";
import StateSidebar from "../features/charts/StateSisdebar";
import BookingSlider from "../ui/BookingingSlider";
import WelcomeModal from "../ui/WelcomeModal";
import { useStats } from "../features/FrontDesk/useStatsService";
import { useBookings } from "../features/FrontDesk/useBookings";
import DashboardSidebar from "../features/charts/StateSisdebar";

export default function Dashboard() {
  const { data: stats, isLoading, error } = useStats();
  const { bookings, count } = useBookings();

  return (
    <>
      <BookingSlider />
      <div className="">
        <div className="flex w-full gap-4 p-4 sm:gap-6 sm:p-6">
          <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="min-w-0 flex-1 space-y-4 sm:space-y-6">
              <Stats stats={stats} isLoading={isLoading} error={error} />
              <RoomType stats={stats} />
              <BookingStats bookings={bookings} count={count} />
              <BookingList bookings={bookings} count={count} />
            </div>

            <div className="w-full shrink-0 lg:w-80">
              <DashboardSidebar />
            </div>
          </div>
        </div>
      </div>

      <WelcomeModal />
    </>
  );
}
