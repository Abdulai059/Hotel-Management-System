import ActivityAvailability from "../features/FrontDesk/ActivityAvailability";
import DashboardTopNav from "../features/FrontDesk/DashboardTopNav";
import OccupancyAndFeedback from "../features/FrontDesk/OccupancyAndFeedback";
import RoomType from "../features/FrontDesk/RoomType";
import Stats from "../features/FrontDesk/Stats";
import { useStats } from "../features/FrontDesk/useStatsService";
import BookingingSlider from "../ui/BookingingSlider";
import RoomHeatmap from "../ui/RoomHeatmap";
import WelcomePoppin from "../ui/WelcomePoppin";

export default function Dashboard() {
  const { data: stats, isLoading, error } = useStats();

  return (
    <>
      <div className="mb-6 space-y-6 bg-gray-100">
        <div className="bg-gray-50 pb-0">
          <DashboardTopNav />
          <BookingingSlider />
        </div>

        <Stats stats={stats} isLoading={isLoading} error={error} />
        <RoomHeatmap />
        <RoomType />
        <ActivityAvailability stats={stats} isLoading={isLoading} error={error} />
        <OccupancyAndFeedback />
      </div>
      <WelcomePoppin />
    </>
  );
}
