import ActivityAvailability from "../features/FrontDesk/ActivityAvailability";
import DashboardTopNav from "../features/FrontDesk/DashboardTopNav";
import OccupancyAndFeedback from "../features/FrontDesk/OccupancyAndFeedback";
import RoomType from "../features/FrontDesk/RoomType";
import Stats from "../features/FrontDesk/Stats";
import BookingingSlider from "../ui/BookingingSlider";
import WelcomePoppin from "../ui/WelcomePoppin";

export default function Dashboard() {
  return (
    <>
      <div className="mb-6 space-y-6">
        <div className="sticky top-0 z-10 bg-gray-50 pb-4">
          <DashboardTopNav />
          <BookingingSlider />
        </div>

        <Stats />
        <RoomType />
        <ActivityAvailability />
        <OccupancyAndFeedback />
      </div>
      <WelcomePoppin />
    </>
  );
}
