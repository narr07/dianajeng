<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'
	import gsap from 'gsap'

	// Shown on first load while the photos and fonts arrive. The video and music
	// are not waited for: they keep loading in the background behind the cover.
	const splashDone = useState<boolean>('splash-done', () => false)

	const rootRef = ref<HTMLElement | null>(null)
	const archRef = ref<SVGPathElement | null>(null)
	const percent = ref(0)
	const isGone = ref(false)

	const MIN_SHOW = 2200 // long enough for the arch to finish drawing
	const MAX_WAIT = 9000 // never hold guests on a slow connection

	let introTl: gsap.core.Timeline | null = null
	const progress = { value: 0 }

	const waitForImages = (onStep: (ratio: number) => void) => {
		const imgs = Array.from(document.images).filter((img) => img.loading !== 'lazy')
		const total = imgs.length + 1 // +1 for web fonts
		let done = 0
		const tick = () => onStep(++done / total)

		const imagePromises = imgs.map(
			(img) =>
				new Promise<void>((resolve) => {
					if (img.complete) return resolve()
					img.addEventListener('load', () => resolve(), { once: true })
					img.addEventListener('error', () => resolve(), { once: true })
				}).then(tick)
		)
		const fonts = (document.fonts?.ready ?? Promise.resolve()).then(tick)
		return Promise.all([...imagePromises, fonts])
	}

	const leave = () => {
		if (!rootRef.value) return
		gsap.timeline({
			onComplete: () => {
				isGone.value = true
			}
		})
			.to('.sp-content', { y: -24, opacity: 0, duration: 0.6, ease: 'power2.in' })
			// signal the cover while the curtain is still lifting, so they overlap
			.add(() => {
				splashDone.value = true
			}, 0.35)
			.to(rootRef.value, { yPercent: -100, duration: 1.1, ease: 'power4.inOut' }, 0.35)
	}

	onMounted(async () => {
		const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

		// Everything starts hidden in CSS (so the server-rendered page never
		// flashes the finished state); these tweens bring it in.
		introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
		if (reduce) {
			gsap.set(archRef.value, { strokeDashoffset: 0 })
			gsap.set(['.sp-diamond', '.sp-name', '.sp-date', '.sp-meter'], { opacity: 1 })
		} else {
			introTl
				.to(archRef.value, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0)
				.fromTo(
					'.sp-diamond',
					{ opacity: 0, scale: 0, rotation: -90, transformOrigin: '50% 50%' },
					{ opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2)' },
					1.4
				)
				.fromTo('.sp-name', { y: 18, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.14, duration: 0.9 }, 0.5)
				.fromTo(
					'.sp-date',
					{ opacity: 0, letterSpacing: '0.7em' },
					{ opacity: 1, letterSpacing: '0.45em', duration: 1.1 },
					0.9
				)
				.fromTo('.sp-meter', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 1.1)
		}

		const started = performance.now()
		const loaded = waitForImages((ratio) => {
			gsap.to(progress, {
				value: ratio * 100,
				duration: 0.5,
				ease: 'power1.out',
				onUpdate: () => {
					percent.value = Math.round(progress.value)
				}
			})
		})
		const timeout = new Promise((resolve) => setTimeout(resolve, MAX_WAIT))
		await Promise.race([loaded, timeout])

		// finish the counter, and keep the splash up for at least MIN_SHOW
		await new Promise<void>((resolve) =>
			gsap.to(progress, {
				value: 100,
				duration: 0.4,
				onUpdate: () => {
					percent.value = Math.round(progress.value)
				},
				onComplete: () => resolve()
			})
		)
		const rest = MIN_SHOW - (performance.now() - started)
		if (rest > 0) await new Promise((r) => setTimeout(r, rest))
		leave()
	})

	onUnmounted(() => {
		introTl?.kill()
	})
</script>

<template>
	<div
		v-if="!isGone"
		ref="rootRef"
		class="splash"
		role="status"
		aria-live="polite"
		:aria-label="`Loading invitation, ${percent}%`"
	>
		<div class="sp-content">
			<svg
				class="sp-arch"
				viewBox="0 0 200 260"
				aria-hidden="true"
			>
				<path
					ref="archRef"
					pathLength="1"
					d="M20 250 V100 A80 80 0 0 1 180 100 V250 Z"
					fill="none"
					stroke="#e3c08d"
					stroke-width="1.2"
					stroke-linejoin="round"
				/>
				<rect
					class="sp-diamond"
					x="95"
					y="15"
					width="10"
					height="10"
					fill="#e3c08d"
					transform="rotate(45 100 20)"
				/>
			</svg>

			<div class="sp-names">
				<span class="sp-name">Dian</span>
				<span class="sp-name sp-amp">&amp;</span>
				<span class="sp-name">Ajeng</span>
			</div>
			<p class="sp-date">06 · 12 · 2026</p>

			<div class="sp-meter">
				<span class="sp-bar"><i :style="{ transform: `scaleX(${percent / 100})` }"></i></span>
				<span class="sp-pct">{{ percent }}%</span>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.splash {
		position: fixed;
		inset: 0;
		z-index: 10000;
		display: grid;
		place-items: center;
		background: radial-gradient(60% 45% at 50% 45%, rgba(120, 24, 38, 0.35), transparent 70%), #0b0a0c;
		will-change: transform;
	}

	.sp-content {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.sp-arch {
		width: min(52vw, 210px);
		height: auto;
		overflow: visible;
	}

	/* hidden until the intro draws them in (pathLength=1 makes the dash math unitless) */
	.sp-arch path {
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
	}

	.sp-diamond,
	.sp-name,
	.sp-date,
	.sp-meter {
		opacity: 0;
	}

	/* names sit inside the arch */
	.sp-names {
		position: absolute;
		top: 44%;
		left: 50%;
		translate: -50% -50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		font: italic 400 clamp(26px, 7.5vw, 34px) / 1.1 var(--script);
		color: var(--cream);
		white-space: nowrap;
	}

	.sp-name {
		display: block;
	}

	.sp-amp {
		font-size: 0.7em;
		color: #d65c6c;
		margin: 2px 0;
	}

	.sp-date {
		margin-top: 22px;
		font: 300 11px var(--sans);
		letter-spacing: 0.45em;
		color: var(--cream-60);
	}

	.sp-meter {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-top: 28px;
	}

	.sp-bar {
		position: relative;
		width: 120px;
		height: 1px;
		background: rgba(237, 231, 220, 0.15);
		overflow: hidden;
	}

	.sp-bar i {
		position: absolute;
		inset: 0;
		background: #e3c08d;
		transform-origin: 0 50%;
		transform: scaleX(0);
	}

	.sp-pct {
		min-width: 3ch;
		font: 300 10px var(--sans);
		letter-spacing: 0.2em;
		color: var(--cream-40);
		font-variant-numeric: tabular-nums;
	}
</style>
