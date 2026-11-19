
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your Supabase project credentials
const supabaseUrl = "YOUR_SUPABASE_PROJECT_URL";
const supabaseAnonKey = "YOUR_SUPABASE_PUBLISHABLE_KEY";

// Create Supabase connection
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);
