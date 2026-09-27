import { useSupabase } from '~/composables/useSupabase'

export interface WishItem {
	id: string
	name: string
	message: string
	attendance?: string
	created_at: string
	likes: number
}

const LIKED_KEY = 'dianajeng-liked-wishes'

const readLiked = (): string[] => {
	try {
		return JSON.parse(localStorage.getItem(LIKED_KEY) || '[]')
	} catch {
		return []
	}
}

export const useWishes = () => {
	const wishes = useState<WishItem[]>('wishes-list', () => [])
	const likedIds = useState<string[]>('wishes-liked', () => [])
	const isLoading = useState<boolean>('wishes-loading', () => true)
	const isSending = useState<boolean>('wishes-sending', () => false)

	const supabase = useSupabase()

	const fetchWishes = async () => {
		isLoading.value = true
		likedIds.value = readLiked()
		try {
			if (supabase) {
				const { data, error } = await supabase
					.from('wishes')
					.select('*')
					.order('created_at', { ascending: false })
					.limit(200)
				if (error) throw error
				wishes.value = data || []
			} else {
				// Local development without Supabase configured
				const res = await $fetch<{ success: boolean; data: WishItem[] }>('/api/wishes')
				wishes.value = res?.data || []
			}
		} catch (err) {
			console.error('Error fetching wishes:', err)
		} finally {
			isLoading.value = false
		}
	}

	const sendWish = async (name: string, message: string, attendance = 'Attending') => {
		isSending.value = true
		const optimistic: WishItem = {
			id: 'opt-' + Date.now(),
			name,
			message,
			attendance,
			created_at: new Date().toISOString(),
			likes: 0
		}
		wishes.value = [optimistic, ...wishes.value]
		const replace = (real: WishItem) => {
			// realtime may already have delivered the real row
			const rest = wishes.value.filter((w) => w.id !== optimistic.id && w.id !== real.id)
			wishes.value = [real, ...rest]
		}

		try {
			if (supabase) {
				const { data, error } = await supabase
					.from('wishes')
					.insert([{ name, message, attendance }])
					.select()
					.single()
				if (error) throw error
				replace(data)
				return data
			}
			const res = await $fetch<{ success: boolean; data: WishItem }>('/api/wishes', {
				method: 'POST',
				body: { name, message, attendance }
			})
			replace(res.data)
			return res.data
		} catch (err) {
			// don't leave a wish on screen that was never saved
			wishes.value = wishes.value.filter((w) => w.id !== optimistic.id)
			console.error('Error sending wish:', err)
			throw err
		} finally {
			isSending.value = false
		}
	}

	const isLiked = (id: string) => likedIds.value.includes(id)

	// One like per wish per device
	const likeWish = async (id: string) => {
		const target = wishes.value.find((w) => w.id === id)
		if (!target || isLiked(id) || id.startsWith('opt-')) return
		target.likes = (target.likes || 0) + 1
		likedIds.value = [...likedIds.value, id]
		try {
			localStorage.setItem(LIKED_KEY, JSON.stringify(likedIds.value))
		} catch {}
		if (supabase) {
			const { error } = await supabase.from('wishes').update({ likes: target.likes }).eq('id', id)
			if (error) console.error('Error liking wish:', error)
		}
	}

	const subscribeRealtime = () => {
		if (!supabase) return () => {}

		const channel = supabase
			.channel('realtime-wishes')
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'wishes' }, (payload) => {
				const incoming = payload.new as WishItem
				if (!wishes.value.some((w) => w.id === incoming.id)) {
					wishes.value = [incoming, ...wishes.value]
				}
			})
			.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'wishes' }, (payload) => {
				const updated = payload.new as WishItem
				const target = wishes.value.find((w) => w.id === updated.id)
				if (target) target.likes = Math.max(target.likes || 0, updated.likes || 0)
			})
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}

	return {
		wishes,
		isLoading,
		isSending,
		isLiked,
		fetchWishes,
		sendWish,
		likeWish,
		subscribeRealtime
	}
}
