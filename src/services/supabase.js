import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ihyofvwopmweqvcoewzs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeW9mdndvcG13ZXF2Y29ld3pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzODU5OTcsImV4cCI6MjA4NTk2MTk5N30.j_wKjQierlS9ybKmd3xzRTuqwuXowofEPCk1_f9gIqA";

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
