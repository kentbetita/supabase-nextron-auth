import { SupabaseClientOptions } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'supabase-url';
const supabaseAnonKey = 'supabase-anon-key';

const options: SupabaseClientOptions<any> = {
  db: {
    schema: 'prod'
  }
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, options);
