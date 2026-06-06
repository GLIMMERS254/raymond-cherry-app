import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://pzqfgrgynfkqsmqetzbf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6cWZncmd5bmZrcXNtcWV0emJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MTU2NDAsImV4cCI6MjA5NjI5MTY0MH0.ETyf8J58WIJbRTIN6nrdye-HNdMt1ogaEnRvInLqw4g";

export const supabase = createClient(supabaseUrl, supabaseKey);