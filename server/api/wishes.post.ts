import { serverWishes } from './wishes.get'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (!body || !body.name || !body.message) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Name and message are required.'
		})
	}

	const newWish = {
		id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
		name: String(body.name).trim().slice(0, 50),
		message: String(body.message).trim().slice(0, 400),
		attendance: body.attendance || 'Attending',
		created_at: new Date().toISOString(),
		likes: 0
	}

	serverWishes.unshift(newWish)

	return {
		success: true,
		data: newWish
	}
})
