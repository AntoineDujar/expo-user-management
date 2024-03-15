import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://eobxdouujllrgcyobxrz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvYnhkb3V1amxscmdjeW9ieHJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAzNDQwNDUsImV4cCI6MjAyNTkyMDA0NX0.K98vqk3lqZI_TrEgn0xBgrtNdml1GuaumIkHHurp6Cc"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})