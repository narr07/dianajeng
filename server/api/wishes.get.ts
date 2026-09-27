interface WishItem {
	id: string
	name: string
	message: string
	attendance?: string
	created_at: string
	likes: number
}

// In-memory store, only used in local development when Supabase isn't configured
const serverWishes: WishItem[] = []

export default defineEventHandler((event) => {
	return {
		success: true,
		data: serverWishes
	}
})

export { serverWishes }
