import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://khedoqkdfmeognsntgzy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZWRvcWtkZm1lb2duc250Z3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA0MDk0NzUsImV4cCI6MjA1NTk4NTQ3NX0.WAzOR3rdn-WJ_SzR9PKBUG3BsQNIE9-ZbeJE1fUN0ME";

export const supabase = createClient(supabaseUrl, supabaseKey);