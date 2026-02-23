import { useQuery } from "@tanstack/react-query";
import supabase from "./supabase";

export async function getSchedules(year, month) {
  const startDate = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const endDate = `${year}-${String(month + 1).padStart(2, "0")}-${new Date(year, month + 1, 0).getDate()}`;

  const { data, error } = await supabase
    .from("schedules")
    .select("*")
    .gte("event_date", startDate)
    .lte("event_date", endDate)
    .order("event_date", { ascending: true });

  if (error) throw error;
  return data;
}

export function useSchedules(year, month) {
  return useQuery({
    queryKey: ["schedules", year, month],
    queryFn: () => getSchedules(year, month),
  });
}
