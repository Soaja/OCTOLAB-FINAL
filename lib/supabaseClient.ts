import { createClient } from '@supabase/supabase-js';

// URL je tačan.
const supabaseUrl = 'https://bjwvfxthmfnghwfwchld.supabase.co';

// PAŽNJA: Prethodno ste uneli 'secret' ključ koji je zabranjen u browseru.
// Molimo vas nalepite 'anon' 'public' ključ ovde.
// Nalazi se u: Settings -> API -> Project API keys -> anon public
// Mora počinjati sa "ey..."
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqd3ZmeHRobWZuZ2h3ZndjaGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNDQ5NjgsImV4cCI6MjA4NjkyMDk2OH0.njACtVrjE_evBDUFNB_DyI1jTnE3zSmIFBZXsxinP04';

export const supabase = createClient(
  supabaseUrl, 
  supabaseAnonKey
);