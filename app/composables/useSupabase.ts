import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// One browser client for the whole page.
// Only ever created with the public anon key.
let client: SupabaseClient | null = null

export const useSupabase = (): SupabaseClient | null => {
	if (import.meta.server) return null
	if (client) return client
	const config = useRuntimeConfig()
	const url = config.public.supabaseUrl as string
	const key = config.public.supabaseKey as string
	if (url && key) client = createClient(url, key)
	return client
}
