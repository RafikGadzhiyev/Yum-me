import { createClient } from "@supabase/supabase-js";

// SUPABASE instance
const supabaseClientKey = process.env.NEXT_PUBLIC_STORAGE_PUBLIC_KEY as string;
const supabaseURL = process.env.NEXT_PUBLIC_CMS_URL as string;

export const supabase = createClient(supabaseURL, supabaseClientKey);
