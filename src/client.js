import { createClient } from "@supabase/supabase-js";

const URL = "https://mfhkihxirtcqsbejelju.supabase.co";
const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1maGtpaHhpcnRjcXNiZWplbGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyODI4ODcsImV4cCI6MjAxNDg1ODg4N30.KNVil17mYnsZBxOLSgvlKc2lq20ARu38hm8LmuKUxj4";

export const supabase = createClient(URL, API_KEY);
