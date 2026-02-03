import OrderList from "../features/Restaurant/OrderList";
import OrdersOverview from "../features/Restaurant/OrdersOverview";
import RevenueCharts from "../features/Restaurant/RevenueCharts";
import StatsCards from "../features/Restaurant/StatsCards";

export default function RestaurantDashboard() {
  return (
    <div className="mt-6 w-6xl">
      <StatsCards />
      <RevenueCharts />
      <OrdersOverview />
      <OrderList />
    </div>
  );
}
