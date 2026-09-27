<script setup lang="ts">
	import { ref, watch, onMounted, onUnmounted } from 'vue'
	import gsap from 'gsap'

	const props = defineProps<{
		guestName: string
	}>()

	const emit = defineEmits<{
		(e: 'open'): void
	}>()

	const coverRef = ref<HTMLElement | null>(null)
	const coverBgRef = ref<HTMLElement | null>(null)
	const coverInnerRef = ref<HTMLElement | null>(null)
	const isOpening = ref(false)
	const isDestroyed = ref(false)

	let introTl: gsap.core.Timeline | null = null
	let breathe: gsap.core.Tween | null = null

	// The intro waits for the splash screen to lift
	const splashDone = useState<boolean>('splash-done', () => false)

	onMounted(() => {
		if (!coverRef.value) return

		introTl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
		introTl
			// Photo slowly settles in
			.fromTo(
				coverBgRef.value,
				{ scale: 1.2 },
				{ scale: 1.05, duration: 2.8, ease: 'power2.out' },
				0
			)
			.from('.cover-shade', { opacity: 0, duration: 1.6 }, 0)
			// Top block: eyebrow, then names drop in
			.from(
				'.cover-pre',
				{ opacity: 0, duration: 1.4 },
				0.5
			)
			.from(
				'.cn',
				{ y: -20, opacity: 0, stagger: 0.2, duration: 1.4, ease: 'power2.out' },
				0.75
			)
			// Bottom block: Dear, guest name, button rise up
			.from(
				'.cover-dear > *',
				{ y: 14, opacity: 0, stagger: 0.14, duration: 1 },
				1.4
			)
			.from(
				'.open-btn',
				{ y: 14, opacity: 0, duration: 1 },
				1.7
			)

		// Gentle, endless Ken Burns drift while waiting
		breathe = gsap.to(coverBgRef.value, {
			scale: 1.1,
			duration: 12,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1,
			delay: 2.8,
			paused: true
		})

		watch(
			splashDone,
			(done) => {
				if (!done) return
				introTl?.play()
				breathe?.play()
			},
			{ immediate: true }
		)
	})

	onUnmounted(() => {
		introTl?.kill()
		breathe?.kill()
	})

	const handleOpen = () => {
		if (isOpening.value) return
		isOpening.value = true

		document.body.classList.remove('lock')
		document.body.classList.add('opened')

		if (coverRef.value) {
			coverRef.value.style.pointerEvents = 'none'
		}

		introTl?.progress(1)
		breathe?.kill()

		emit('open')

		// Content fades, then the cover glides up with the photo lagging behind
		gsap.timeline({
			defaults: { ease: 'power3.inOut' },
			onComplete: () => {
				isDestroyed.value = true
			}
		})
			.to(coverInnerRef.value, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0)
			.to(coverRef.value, { yPercent: -100, duration: 1.4, ease: 'power4.inOut' }, 0.3)
			.to(coverBgRef.value, { yPercent: 35, scale: 1.18, duration: 1.4, ease: 'power4.inOut' }, 0.3)
	}
</script>

<template>
	<div
		v-if="!isDestroyed"
		ref="coverRef"
		:class="['cover', { 'is-opening': isOpening }]"
		id="cover"
	>
		<div class="cover-bg">
			<img
				ref="coverBgRef"
				src="/cover.jpeg"
				alt="Dian &amp; Ajeng"
			/>
		</div>
		<div class="cover-shade"></div>

		<div
			ref="coverInnerRef"
			class="cover-inner"
		>
			<div class="cover-top">
				<p class="cover-pre">The Wedding of</p>
				<h1 class="cover-names">
					<span class="cn">Dian</span>
					<span class="cn">&amp; Ajeng</span>
				</h1>
			</div>

			<div class="cover-bottom">
				<div class="cover-dear">
					<p>Dear</p>
					<p class="guest-name">{{ props.guestName || 'Honored Guest' }}</p>
				</div>
				<button
					class="open-btn"
					type="button"
					onclick="document.body.classList.remove('lock'); document.body.classList.add('opened'); const c = document.getElementById('cover'); if(c) c.style.pointerEvents='none';"
					@click="handleOpen"
				>
					Open Invitation
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.cover {
		position: fixed;
		inset: 0;
		z-index: 9999;
		overflow: hidden;
		background: #0b0a0c;
		will-change: transform;
	}

	.cover.is-opening {
		pointer-events: none !important;
	}

	/* The photo sits a little lower than the screen so the couple's faces stay
	   clear of the names; the gap above is the same backdrop colour as the
	   studio wall, and the photo's top edge fades into it. */
	.cover-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		background: rgb(89, 76, 60);
	}

	.cover-bg img {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 88%;
		object-fit: cover;
		object-position: 53% 100%;
		-webkit-mask-image: linear-gradient(180deg, transparent 0, #000 14%);
		mask-image: linear-gradient(180deg, transparent 0, #000 14%);
		will-change: transform;
	}

	/* Darken top for the names and bottom for the guest block, keep faces clear */
	.cover-shade {
		position: absolute;
		inset: 0;
		background:
			linear-gradient(
				180deg,
				rgba(11, 10, 12, 0.55) 0%,
				rgba(11, 10, 12, 0.12) 30%,
				rgba(11, 10, 12, 0) 48%,
				rgba(11, 10, 12, 0.35) 66%,
				rgba(11, 10, 12, 0.85) 100%
			);
	}

	.cover-inner {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		text-align: center;
		padding: max(14vh, 70px) 24px max(9vh, 48px);
		color: #fff;
		will-change: transform, opacity;
	}

	/* Wide screens: a portrait photo stretched edge to edge only shows the
	   couple's feet. Keep the phone composition in a centred column and fill
	   the sides with a blurred copy of the same photo. */
	@media (min-width: 600px) {
		.cover::before {
			content: '';
			position: absolute;
			inset: -40px;
			background: url('/cover.jpeg') center 30% / cover no-repeat;
			z-index: 0;
			filter: blur(28px) brightness(0.45) saturate(1.1);
		}

		.cover-bg {
			left: 50%;
			right: auto;
			width: min(100%, 480px);
			translate: -50% 0;
			z-index: 1;
			box-shadow: 0 0 80px rgba(0, 0, 0, 0.6);
		}

		.cover-shade {
			left: 50%;
			right: auto;
			width: min(100%, 480px);
			translate: -50% 0;
			z-index: 1;
		}
	}

	.cover-top,
	.cover-bottom {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.cover-pre {
		font: 300 15px var(--sans);
		letter-spacing: 0.08em;
		color: rgba(255, 255, 255, 0.92);
	}

	.cover-names {
		font-family: var(--script), Georgia, serif;
		font-style: italic;
		font-weight: 400;
		font-size: clamp(42px, 12vw, 56px);
		line-height: 1.08;
		margin-top: 14px;
		color: #fff;
		text-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
	}

	.cover-names .cn {
		display: block;
		will-change: transform, opacity;
	}


	.cover-dear {
		margin-bottom: 22px;
	}

	.cover-dear p:first-child {
		font: 300 14px var(--sans);
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.85);
	}

	.guest-name {
		font: 400 21px var(--sans);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		margin-top: 8px;
		color: #fff;
	}

	.open-btn {
		padding: 12px 50px;
		border: 0;
		border-radius: 0;
		background: rgba(255, 255, 255, 0.38);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		color: #fff;
		font: 500 15px var(--sans);
		letter-spacing: 0.04em;
		text-transform: uppercase;
		cursor: pointer;
		transition: background 0.4s ease, transform 0.2s ease;
	}

	.open-btn:hover {
		background: #000;
	}

	.open-btn:active {
		transform: scale(0.97);
	}
</style>
