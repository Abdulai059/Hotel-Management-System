import BookingByPlatform from "../features/FrontDesk/BookingByPlatform";
import BookingStats from "../features/FrontDesk/BookingStats";
import CustomerFeedback from "../features/FrontDesk/CustomerFeedback";
import DashboardTopNav from "../features/FrontDesk/DashboardTopNav";
import OccupancyStatistics from "../features/FrontDesk/OccupancyStatistics";
import ReservationsChart from "../features/charts/ReservationsChart";
import RoomType from "../features/FrontDesk/RoomType";
import Stats from "../features/FrontDesk/Stats";
import { useStats } from "../features/FrontDesk/useStatsService";
import BookingingSlider from "../ui/BookingingSlider";
import RoomHeatmap from "../ui/RoomHeatmap";
import WelcomePoppin from "../ui/WelcomePoppin";
import BookingList from "../features/charts/BookingList";
import { useBookings } from "../features/FrontDesk/useBookings";

export default function Dashboard() {
  const { data: stats, isLoading, error } = useStats();
  const { bookings, count } = useBookings();

  console.log("bookings", bookings);

  return (
    <>
      <div className="min-h-screen space-y-4 bg-gray-100 pb-6 sm:space-y-6">
        <div className="bg-gray-50 pb-0">
          <DashboardTopNav />
          <BookingingSlider />
        </div>

        <div className="space-y-4 px-4 sm:space-y-6 sm:px-0">
          <Stats stats={stats} isLoading={isLoading} error={error} />
          {/* <RoomHeatmap /> */}
          <RoomType stats={stats} />
          <BookingStats bookings={bookings} count={count} />

          <BookingList bookings={bookings} count={count} />
          {/* <ActivityAvailability stats={stats} isLoading={isLoading} error={error} /> */}
          {/* <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
            <OccupancyStatistics />
            <CustomerFeedback />
          </div> */}
        </div>
      </div>
      <WelcomePoppin />
    </>
  );
}
