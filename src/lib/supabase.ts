import { createClient } from '@supabase/supabase-js'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anonymous Key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type AuthError = {
  message: string
}

export type User = SupabaseUser 