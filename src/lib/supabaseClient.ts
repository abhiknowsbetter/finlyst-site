import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hzoyfahhigpsfvywpjoj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6b3lmYWhoaWdwc2Z2eXdwam9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDM2ODksImV4cCI6MjA3NjAxOTY4OX0.Nq3h2aDUhNi53Rp-MUuOZZn5tb7ddnbdHkXBkNg54hY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);