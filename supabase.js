
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Your Supabase project credentials
const supabaseUrl = "https://dprtiiokbkmxvzovbxhc.supabase.co";
const supabaseAnonKey = "sb_publishable_Wmv-ZidePByCDyixvMqZPg_AeGGR5vd";

// Create Supabase connection
export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);
