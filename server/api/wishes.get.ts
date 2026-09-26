interface WishItem {
	id: string
	name: string
	message: string
	attendance?: string
	created_at: string
	likes: number
}

// In-memory / server state with initial messages
const serverWishes: WishItem[] = [
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

export default defineEventHandler((event) => {
	return {
		success: true,
		data: serverWishes
	}
})

export { serverWishes }
