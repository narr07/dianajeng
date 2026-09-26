import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface WishItem {
	id: string
	name: string
	message: string
	attendance?: string
	created_at: string
	likes: number
}

const defaultInitialWishes: WishItem[] = [
	{
		id: '1',
		name: 'Andini Prameswari',
		message: 'Warmest congratulations, Dian & Ajeng! Wishing you both a lifetime of immense joy, peace, and eternal love.',
		attendance: 'Attending',
		created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
		likes: 12
	},
	{
		id: '2',
		name: 'Bagas Wicaksono',
		message: 'May Allah bless your sacred union with tranquility, deep affection, and infinite mercy. Barokallahu lakuma!',
		attendance: 'Attending',
		created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
		likes: 8
	},
	{
		id: '3',
		name: 'Sarah & Tom',
		message: 'So incredibly happy for you two! Wishing you an unforgettable journey together. See you on December 6!',
		attendance: 'Attending',
		created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
		likes: 5
	}
]

export const useWishes = () => {
	const config = useRuntimeConfig()
	const wishes = useState<WishItem[]>('wishes-list', () => defaultInitialWishes)
	const isLoading = useState<boolean>('wishes-loading', () => false)
	const isSending = useState<boolean>('wishes-sending', () => false)

	let supabase: SupabaseClient | null = null

	if (config.public.supabaseUrl && config.public.supabaseKey) {
		try {
			supabase = createClient(config.public.supabaseUrl, config.public.supabaseKey)
		} catch (e) {
			console.warn('Supabase client failed to initialize, using Nitro API fallback:', e)
		}
	}

	const fetchWishes = async () => {
		try {
			if (supabase) {
				const { data, error } = await supabase
					.from('wishes')
					.select('*')
					.order('created_at', { ascending: false })
					.limit(50)

				if (!error && data && data.length > 0) {
					wishes.value = data
					return
				}
			}

			// Fallback to Nitro API
			const res = await $fetch<{ success: boolean; data: WishItem[] }>('/api/wishes')
			if (res && res.data && res.data.length > 0) {
				wishes.value = res.data
			}
		} catch (err) {
			console.error('Error fetching wishes:', err)
		}
	}

	const sendWish = async (name: string, message: string, attendance = 'Hadir') => {
		isSending.value = true
		try {
			const optimisticWish: WishItem = {
				id: 'opt-' + Date.now(),
				name,
				message,
				attendance,
				created_at: new Date().toISOString(),
				likes: 0
			}

			// Optimistic update
			wishes.value = [optimisticWish, ...wishes.value]

			if (supabase) {
				const { data, error } = await supabase
					.from('wishes')
					.insert([{ name, message, attendance }])
					.select()
					.single()

				if (!error && data) {
					const index = wishes.value.findIndex((w) => w.id === optimisticWish.id)
					if (index !== -1) {
						wishes.value[index] = data
					}
					return { success: true, data }
				}
			}

			// Nitro API fallback
			const res = await $fetch<{ success: boolean; data: WishItem }>('/api/wishes', {
				method: 'POST',
				body: { name, message, attendance }
			})

			if (res && res.data) {
				const index = wishes.value.findIndex((w) => w.id === optimisticWish.id)
				if (index !== -1) {
					wishes.value[index] = res.data
				}
				return { success: true, data: res.data }
			}

			return { success: true, data: optimisticWish }
		} catch (err) {
			console.error('Error sending wish:', err)
			throw err
		} finally {
			isSending.value = false
		}
	}

	const likeWish = (id: string) => {
		const target = wishes.value.find((w) => w.id === id)
		if (target) {
			target.likes = (target.likes || 0) + 1
			if (supabase) {
				supabase
					.from('wishes')
					.update({ likes: target.likes })
					.eq('id', id)
					.then()
			}
		}
	}

	const subscribeRealtime = () => {
		if (!supabase || import.meta.server) return () => {}

		const channel = supabase
			.channel('realtime-wishes')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'wishes' },
				(payload) => {
					const newWish = payload.new as WishItem
					if (!wishes.value.some((w) => w.id === newWish.id)) {
						wishes.value = [newWish, ...wishes.value]
					}
				}
			)
			.subscribe()

		return () => {
			supabase?.removeChannel(channel)
		}
	}

	return {
		wishes,
		isLoading,
		isSending,
		fetchWishes,
		sendWish,
		likeWish,
		subscribeRealtime
	}
}
