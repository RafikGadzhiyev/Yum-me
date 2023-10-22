import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "@supabase/supabase-js";

// SUPABASE instance
const supabaseClientKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;

export const supabase = createClient(supabaseURL, supabaseClientKey);

export const supabaseClient = createClientComponentClient();
