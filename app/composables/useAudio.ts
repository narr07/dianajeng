// Background music. One shared <audio> element for the whole page, so the
// cover's "Open Invitation" and the floating music button control the same track.
//
// The file is served as /media/music.bga (a neutral extension) and played from a
// blob URL so download managers (IDM) don't pop up a "download this audio" panel.
const SRC = '/media/music.bga'
const VOLUME = 0.8
const FADE_IN = 2000
const FADE_OUT = 900

let audio: HTMLAudioElement | null = null
let blobUrl: string | null = null
let pendingPlay = false
let fadeRaf = 0
let pausedByTab = false

const fadeTo = (target: number, ms: number, done?: () => void) => {
	if (!audio) return
	cancelAnimationFrame(fadeRaf)
	const el = audio
	const from = el.volume
	const start = performance.now()
	const step = (now: number) => {
		const k = Math.min(1, (now - start) / ms)
		el.volume = from + (target - from) * k
		if (k < 1) fadeRaf = requestAnimationFrame(step)
		else done?.()
	}
	fadeRaf = requestAnimationFrame(step)
}

const startPlayback = () => {
	if (!audio || !audio.src) {
		pendingPlay = true
		return
	}
	pendingPlay = false
	audio.volume = 0
	audio
		.play()
		.then(() => fadeTo(VOLUME, FADE_IN))
		.catch(() => {})
}

const ensureAudio = () => {
	if (audio) return
	audio = new Audio()
	audio.loop = true
	audio.preload = 'auto'

	fetch(SRC)
		.then((res) => res.arrayBuffer())
		.then((buf) => {
			blobUrl = URL.createObjectURL(new Blob([buf], { type: 'audio/mpeg' }))
			audio!.src = blobUrl
			if (pendingPlay) startPlayback()
		})
		.catch(() => {})

	// Pause while the guest is in another tab, pick up again when they return
	document.addEventListener('visibilitychange', () => {
		if (!audio) return
		if (document.hidden && !audio.paused) {
			pausedByTab = true
			audio.pause()
		} else if (!document.hidden && pausedByTab) {
			pausedByTab = false
			audio.play().catch(() => {})
		}
	})
}

export const useAudio = () => {
	const isPlaying = useState<boolean>('audio-is-playing', () => false)

	// start downloading as soon as the page mounts, so the track is ready by the
	// time the guest taps "Open Invitation"
	if (import.meta.client) ensureAudio()

	const play = () => {
		if (import.meta.server) return
		ensureAudio()
		isPlaying.value = true
		startPlayback()
	}

	const stop = () => {
		isPlaying.value = false
		pendingPlay = false
		fadeTo(0, FADE_OUT, () => audio?.pause())
	}

	const toggle = () => {
		if (isPlaying.value) {
			stop()
		} else {
			play()
		}
	}

	return {
		isPlaying,
		play,
		stop,
		toggle
	}
}
