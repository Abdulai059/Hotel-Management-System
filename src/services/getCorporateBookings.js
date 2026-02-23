import supabase from "./supabase";

export async function getCorporateBookings() {
  const { data, error } = await supabase
    .from("corporate_booking")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
