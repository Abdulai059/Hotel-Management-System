import supabase from "./supabase";
import { useQuery } from "@tanstack/react-query";

export async function getDailyCheckInOut() {
  const today = new Date().toISOString().split("T")[0];
  const lastWeekToday = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const [{ data: todayData, error: todayError }, { data: lastWeekData, error: lastWeekError }] = await Promise.all([
    supabase.from("bookings").select("start_date, end_date").or(`start_date.eq.${today},end_date.eq.${today}`),
    supabase
      .from("bookings")
      .select("start_date, end_date")
      .or(`start_date.eq.${lastWeekToday},end_date.eq.${lastWeekToday}`),
  ]);

  if (todayError) throw todayError;
  if (lastWeekError) throw lastWeekError;

  const todayCheckIns = todayData?.filter((b) => b.start_date === today).length || 0;
  const todayCheckOuts = todayData?.filter((b) => b.end_date === today).length || 0;

  const lastWeekCheckIns = lastWeekData?.filter((b) => b.start_date === lastWeekToday).length || 0;
  const lastWeekCheckOuts = lastWeekData?.filter((b) => b.end_date === lastWeekToday).length || 0;

  const checkInChange = lastWeekCheckIns === 0 ? 0 : ((todayCheckIns - lastWeekCheckIns) / lastWeekCheckIns) * 100;
  const checkOutChange = lastWeekCheckOuts === 0 ? 0 : ((todayCheckOuts - lastWeekCheckOuts) / lastWeekCheckOuts) * 100;

  return {
    checkIns: todayCheckIns,
    checkOuts: todayCheckOuts,
    checkInChange: parseFloat(checkInChange.toFixed(2)),
    checkOutChange: parseFloat(checkOutChange.toFixed(2)),
  };
}

export function useDailyCheckInOut() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dailyCheckInOut"],
    queryFn: getDailyCheckInOut,
  });

  return { data, isLoading, error };
}
