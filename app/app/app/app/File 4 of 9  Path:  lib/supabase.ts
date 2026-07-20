import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// This client is safe to use in the browser — the anon key only allows
// what your Row Level Security policies in Supabase permit.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
