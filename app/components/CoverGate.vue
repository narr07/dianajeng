<script setup lang="ts">
	import { ref, onMounted } from 'vue'
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

	onMounted(() => {
		if (coverRef.value) {
			const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
			tl.from(
				coverBgRef.value,
				{ scale: 1.15, duration: 1.8, ease: 'power2.out' },
				0
			)
				.from(
					'.cover-shade',
					{ opacity: 0, duration: 1.2 },
					0
				)
				.from(
					'.cover-pre',
					{ y: 16, opacity: 0, duration: 0.8 },
					0.2
				)
				.from(
					'.cn-l',
					{ x: -50, opacity: 0, duration: 0.9, ease: 'power3.out' },
					0.35
				)
				.from(
					'.cn-r',
					{ x: 50, opacity: 0, duration: 0.9, ease: 'power3.out' },
					0.35
				)
				.from(
					'.cover-dear > *',
					{ y: 14, opacity: 0, stagger: 0.08, duration: 0.8 },
					0.6
				)
				.from(
					'.open-btn',
					{ scale: 0.92, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' },
					0.8
				)
		}
	})

	const handleOpen = () => {
		if (isOpening.value) return
		isOpening.value = true

		// 1. Force remove body lock immediately so page can be scrolled
		document.body.classList.remove('lock')
		document.body.classList.add('opened')

		// 2. Disable pointer events immediately so it never blocks gestures
		if (coverRef.value) {
			coverRef.value.style.pointerEvents = 'none'
		}

		// 3. Emit open event
		emit('open')

		// 4. Smooth curtain lift-up animation & complete destruction
		const tl = gsap.timeline({
			defaults: { ease: 'power3.inOut' },
			onComplete: () => {
				isDestroyed.value = true
			}
		})

		tl.to(
			coverInnerRef.value,
			{ y: -50, autoAlpha: 0, duration: 0.5, ease: 'power2.in' },
			0
		)
			.to(
				coverBgRef.value,
				{ scale: 1.15, duration: 0.9 },
				0
			)
			.to(
				coverRef.value,
				{ yPercent: -100, autoAlpha: 0, duration: 0.85, ease: 'power4.inOut' },
				0.15
			)
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
				src="https://picsum.photos/seed/kenam-cover/900/1400"
				alt="Dian &amp; Ajeng Cover"
			/>
		</div>
		<div class="cover-shade"></div>
		<div
			ref="coverInnerRef"
			class="cover-inner"
		>
			<p class="cover-pre">The Wedding Of</p>
			<h1 class="cover-names">
				<span class="cn cn-l">Dian</span>
				<span class="cn cn-r">&amp; Ajeng</span>
			</h1>
			<div class="cover-dear">
				<p>Dear,</p>
				<p class="guest-name">{{ guestName || 'Honored Guest' }}</p>
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
</template>

<style scoped>
	.cover {
		position: fixed;
		inset: 0;
		z-index: 9999;
		display: grid;
		place-items: center;
		text-align: center;
		overflow: hidden;
		background: #0b0a0c;
		will-change: transform, opacity;
	}

	.cover.is-opening {
		pointer-events: none !important;
	}

	.cover-bg {
		position: absolute;
		inset: 0;
	}

	.cover-bg img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		will-change: transform;
	}

	.cover-shade {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(11, 10, 12, 0.75),
			rgba(11, 10, 12, 0.45) 45%,
			rgba(11, 10, 12, 0.88)
		);
	}

	.cover-inner {
		position: relative;
		z-index: 2;
		padding: 30px;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--cream);
		will-change: transform, opacity;
	}

	.cover-pre {
		font: 300 12px var(--sans);
		letter-spacing: 0.42em;
		text-transform: uppercase;
		color: var(--cream-60);
	}

	.cover-names {
		font-family: var(--script), cursive, sans-serif;
		font-weight: 400;
		font-size: clamp(62px, 19vw, 92px);
		line-height: 0.95;
		margin: 16px 0 26px;
		color: var(--cream);
		text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
	}

	.cover-names .cn {
		display: block;
	}

	.cover-dear {
		margin-bottom: 28px;
	}

	.cover-dear p:first-child {
		font: 300 11px var(--sans);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--cream-60);
	}

	.guest-name {
		font: 400 19px var(--serif);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		margin-top: 7px;
		color: var(--cream);
	}

	.open-btn {
		min-width: min(300px, 84vw);
		padding: 16px 26px;
		border-radius: 999px;
		border: 1px solid rgba(237, 231, 220, 0.35);
		background: rgba(12, 11, 13, 0.55);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		color: var(--cream);
		font: 300 12px var(--sans);
		letter-spacing: 0.34em;
		text-transform: uppercase;
		cursor: pointer;
		transition: background 0.3s, transform 0.2s, border-color 0.3s;
	}

	.open-btn:hover {
		background: rgba(12, 11, 13, 0.85);
		border-color: rgba(237, 231, 220, 0.6);
		transform: scale(1.02);
	}

	.open-btn:active {
		transform: scale(0.98);
	}
</style>
