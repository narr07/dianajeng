<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import gsap from 'gsap'
	import MarqueeTrack from '~/components/MarqueeTrack.vue'

	const props = withDefaults(
		defineProps<{
			targetDate?: string
		}>(),
		{
			targetDate: '2026-12-06T09:00:00+07:00'
		}
	)

	const days = ref('00')
	const hours = ref('00')
	const minutes = ref('00')
	const seconds = ref('00')

	const dayEl = ref<HTMLElement | null>(null)
	const hourEl = ref<HTMLElement | null>(null)
	const minEl = ref<HTMLElement | null>(null)
	const secEl = ref<HTMLElement | null>(null)

	let timerInterval: any = null

	const animateChange = (el: HTMLElement | null, newVal: string, oldVal: string) => {
		if (!el || newVal === oldVal) return
		gsap.fromTo(
			el,
			{ y: -9, opacity: 0.3 },
			{ y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
		)
	}

	const updateCountdown = () => {
		const target = new Date(props.targetDate).getTime()
		const now = Date.now()
		const diff = Math.max(0, target - now)

		const d = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0')
		const h = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0')
		const m = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0')
		const s = String(Math.floor((diff / 1000) % 60)).padStart(2, '0')

		if (d !== days.value) {
			animateChange(dayEl.value, d, days.value)
			days.value = d
		}
		if (h !== hours.value) {
			animateChange(hourEl.value, h, hours.value)
			hours.value = h
		}
		if (m !== minutes.value) {
			animateChange(minEl.value, m, minutes.value)
			minutes.value = m
		}
		if (s !== seconds.value) {
			animateChange(secEl.value, s, seconds.value)
			seconds.value = s
		}
	}

	onMounted(() => {
		updateCountdown()
		timerInterval = setInterval(updateCountdown, 1000)
	})

	onUnmounted(() => {
		if (timerInterval) clearInterval(timerInterval)
	})
</script>

<template>
	<section
		class="countdown snap"
		id="event"
	>
		<div class="parallax">
			<img
				src="/1.jpeg"
				alt="Countdown Background"
			/>
		</div>
		<div class="cd-shade"></div>
		<div class="cd-content">
			<p class="eyebrow reveal">Counting Down</p>
			<h3 class="cd-forever reveal">Forever</h3>
			<div class="cd-timer">
				<div class="t-cell">
					<span ref="dayEl">{{ days }}</span>
					<small>Days</small>
				</div>
				<div class="t-cell">
					<span ref="hourEl">{{ hours }}</span>
					<small>Hours</small>
				</div>
				<div class="t-cell">
					<span ref="minEl">{{ minutes }}</span>
					<small>Minutes</small>
				</div>
				<div class="t-cell">
					<span ref="secEl">{{ seconds }}</span>
					<small>Seconds</small>
				</div>
			</div>
			<p class="cd-day reveal">Sunday</p>
			<h3 class="cd-date reveal">6 December 2026</h3>
			<p class="cd-label reveal">Wedding Day</p>
			<p class="cd-invite reveal">
				Together with our families, we warmly invite you to celebrate our wedding.
			</p>
		</div>

		<div class="cd-marquee-footer">
			<MarqueeTrack direction="r">
				<span>Save The Date</span>
				<b>✦</b>
				<span>Dian &amp; Ajeng</span>
				<b>✦</b>
				<span>Majalengka</span>
				<b>✦</b>
				<span>Save The Date</span>
				<b>✦</b>
				<span>Dian &amp; Ajeng</span>
				<b>✦</b>
				<span>Majalengka</span>
				<b>✦</b>
			</MarqueeTrack>
		</div>
	</section>
</template>

<style scoped>
	.countdown {
		position: relative;
		overflow: hidden;
		text-align: center;
	}

	.cd-shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(11, 10, 12, 0.55),
			rgba(11, 10, 12, 0.35) 40%,
			rgba(11, 10, 12, 0.88)
		);
	}

	.cd-content {
		position: relative;
		z-index: 2;
		padding: 72px 26px;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.cd-forever {
		font: 400 clamp(28px, 9vw, 40px) var(--serif);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		margin-top: 12px;
	}

	.cd-timer {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		border-block: 1px solid var(--line);
		margin: 30px 0 34px;
	}

	.t-cell {
		padding: 18px 4px;
		text-align: center;
		border-right: 1px solid var(--line);
	}

	.t-cell:last-child {
		border-right: 0;
	}

	.t-cell span {
		display: block;
		font: 300 clamp(32px, 9vw, 42px) / 1 var(--serif);
	}

	.t-cell small {
		display: block;
		margin-top: 8px;
		font: 300 9px var(--sans);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--cream-40);
	}

	.cd-day {
		font: 300 11px var(--sans);
		letter-spacing: 0.42em;
		text-transform: uppercase;
		color: var(--cream-60);
	}

	.cd-date {
		font: 400 clamp(24px, 7.4vw, 31px) var(--serif);
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin-top: 12px;
	}

	.cd-label {
		margin-top: 12px;
		font: 300 10px var(--sans);
		letter-spacing: 0.42em;
		text-transform: uppercase;
		color: var(--maroon);
		filter: brightness(1.35);
	}

	.cd-invite {
		margin: 22px auto 0;
		font: 300 13.5px / 1.85 var(--sans);
		color: var(--cream-60);
		max-width: 32ch;
	}
</style>
