export const useAudio = () => {
	const isPlaying = useState<boolean>('audio-is-playing', () => false)

	let actx: AudioContext | null = null
	let master: GainNode | null = null
	let loopTimer: any = null
	let chordIdx = 0

	const CHORDS = [
		[261.63, 329.63, 392.00, 523.25], // C - E - G - C
		[220.00, 261.63, 329.63, 440.00], // A - C - E - A
		[174.61, 220.00, 261.63, 349.23], // F - A - C - F
		[196.00, 246.94, 293.66, 392.00]  // G - B - D - G
	]

	const ensureAudio = () => {
		if (import.meta.server) return
		if (actx) return
		const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
		if (!AudioCtx) return
		actx = new AudioCtx()
		master = actx.createGain()
		master.gain.value = 0
		const filter = actx.createBiquadFilter()
		filter.type = 'lowpass'
		filter.frequency.value = 1100
		filter.Q.value = 0.4
		master.connect(filter)
		filter.connect(actx.destination)
	}

	const playChord = () => {
		if (!isPlaying.value || !actx || !master) return
		const t = actx.currentTime
		const chord = CHORDS[chordIdx++ % CHORDS.length]

		chord.forEach((fr, i) => {
			const configs: [OscillatorType, number, number][] = [
				['sine', 1, 1],
				['triangle', 2, 0.35]
			]
			configs.forEach(([type, mul, amp]) => {
				if (!actx || !master) return
				const o = actx.createOscillator()
				o.type = type
				o.frequency.value = fr * mul
				const g = actx.createGain()
				const peak = (0.16 / (i + 1)) * amp
				g.gain.setValueAtTime(0.0001, t)
				g.gain.linearRampToValueAtTime(peak, t + 1.4)
				g.gain.setValueAtTime(peak, t + 3.0)
				g.gain.linearRampToValueAtTime(0.0001, t + 5.4)
				o.connect(g)
				g.connect(master)
				o.start(t)
				o.stop(t + 5.6)
			})
		})
	}

	const play = () => {
		if (import.meta.server) return
		ensureAudio()
		if (actx && actx.state === 'suspended') {
			actx.resume()
		}
		isPlaying.value = true
		if (actx && master) {
			const t = actx.currentTime
			master.gain.cancelScheduledValues(t)
			master.gain.setValueAtTime(master.gain.value, t)
			master.gain.linearRampToValueAtTime(0.5, t + 2)
		}
		if (!loopTimer) {
			playChord()
			loopTimer = setInterval(playChord, 4200)
		}
	}

	const stop = () => {
		isPlaying.value = false
		if (loopTimer) {
			clearInterval(loopTimer)
			loopTimer = null
		}
		if (actx && master) {
			const t = actx.currentTime
			master.gain.cancelScheduledValues(t)
			master.gain.setValueAtTime(master.gain.value, t)
			master.gain.linearRampToValueAtTime(0.0001, t + 0.9)
		}
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
