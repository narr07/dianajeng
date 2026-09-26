interface RsvpEntry {
	id: string
	name: string
	guests: string
	attendance: string
	submitted_at: string
}

const rsvpList: RsvpEntry[] = []

export default defineEventHandler(async (event) => {
	const body = await readBody(event)

	if (!body || !body.name) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Name is required.'
		})
	}

	const entry: RsvpEntry = {
		id: 'rsvp-' + Date.now(),
		name: String(body.name).trim(),
		guests: String(body.guests || '1'),
		attendance: String(body.attendance || 'yes'),
		submitted_at: new Date().toISOString()
	}

	rsvpList.push(entry)

	return {
		success: true,
		message: 'RSVP successfully received.',
		data: entry
	}
})
