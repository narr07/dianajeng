<script setup lang="ts">
	import { ref, onMounted, onUnmounted } from 'vue'

	const videoRef = ref<HTMLVideoElement | null>(null)

	// Split in the template (not in JS) so the full verse is still in the SSR HTML
	const verseWords = 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He put between you affection and mercy.'.split(' ')

	// The file is served under a neutral extension and played from a blob URL so
	// download managers (IDM) don't pop up their "download this video" panel.
	// Muted is set on the element because Vue's SSR drops the attribute and
	// browsers then block autoplay.
	let objectUrl: string | null = null

	onMounted(async () => {
		const v = videoRef.value
		if (!v) return
		v.muted = true
		try {
			const res = await fetch('/media/hero.bgv')
			const blob = new Blob([await res.arrayBuffer()], { type: 'video/mp4' })
			objectUrl = URL.createObjectURL(blob)
			v.src = objectUrl
			await v.play()
		} catch {
			// autoplay may still be blocked; the dark background stays visible
		}
	})

	onUnmounted(() => {
		if (objectUrl) URL.revokeObjectURL(objectUrl)
	})
</script>

<template>
	<section
		class="hv snap"
		id="home-video"
	>
		<div class="hv-bg">
			<video
				ref="videoRef"
				autoplay
				muted
				loop
				playsinline
				aria-hidden="true"
			></video>
		</div>
		<div class="hv-shade"></div>

		<div class="hv-content">
			<p class="eyebrow hv-eyebrow hv-mask">
				<span class="hv-mask-in">The Wedding Of</span>
			</p>
			<h2 class="hv-names hv-mask">
				<span class="hv-mask-in">Dian <span class="hv-amp">&amp;</span> Ajeng</span>
			</h2>
			<div class="hv-date-wrap">
				<span class="hv-line"></span>
				<p class="hv-date hv-mask">
					<span class="hv-mask-in">06 · 12 · 2026</span>
				</p>
				<span class="hv-line"></span>
			</div>
		</div>

		<div class="hv-quote">
			<p
				class="hv-read"
				data-read-along
				data-read-along-pin
			>
				<span class="hv-mark">“</span><template
					v-for="(w, i) in verseWords"
					:key="i"
				><span class="word">{{ w }}</span>{{ i < verseWords.length - 1 ? ' ' : '' }}</template><span class="hv-mark">”</span>
			</p>
			<span class="hv-verse">QS. Ar-Rum : 21</span>
		</div>
	</section>
</template>

<style scoped>
	.hv {
		position: relative;
		/* exactly one screen tall so the pinned frame has no gap above it;
		   the video covers it (only the sides trim on tall phones) */
		width: 100%;
		height: 100vh;
		height: 100svh;
		min-height: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		background: #0b0a0c;
		/* leave room for the fixed bottom nav */
		padding: 50px 20px calc(92px + env(safe-area-inset-bottom));
	}

	.hv-bg {
		position: absolute;
		inset: 0;
	}

	.hv-bg video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.hv-shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(11, 10, 12, 0.65),
			rgba(11, 10, 12, 0.25) 35%,
			rgba(11, 10, 12, 0.2) 55%,
			rgba(11, 10, 12, 0.88)
		);
		pointer-events: none;
	}

	.hv-content {
		position: relative;
		z-index: 3;
		margin-top: clamp(40px, 10vh, 80px);
		text-align: center;
		padding: 0 16px;
		width: 100%;
	}

	/* each line slides up from behind its own clip */
	.hv-mask {
		overflow: hidden;
		padding-bottom: 0.08em;
	}

	.hv-mask-in {
		display: inline-block;
		will-change: transform;
	}

	/* script swashes reach past the line box; give them room inside the clip */
	.hv-names.hv-mask {
		padding: 0.12em 0.3em 0.2em;
	}

	.hv-eyebrow {
		letter-spacing: 0.45em;
	}

	.hv-names {
		font-family: var(--script);
		font-weight: 400;
		font-size: clamp(54px, 16vw, 76px);
		line-height: 1.05;
		margin-top: 10px;
	}

	.hv-amp {
		font-size: 0.58em;
		opacity: 0.85;
		color: var(--maroon);
		filter: brightness(1.4);
	}

	.hv-date-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-top: 14px;
	}

	.hv-line {
		display: inline-block;
		transform-origin: center;
		width: clamp(24px, 8vw, 42px);
		height: 1px;
		background: var(--line);
	}

	.hv-date {
		font: 300 11px var(--sans);
		letter-spacing: 0.45em;
		color: var(--cream-60);
	}

	/* frosted panel so the verse stays legible over the moving video */
	.hv-quote {
		position: relative;
		z-index: 3;
		text-align: center;
		padding: 22px 24px 18px;
		max-width: 380px;
		margin: 0 4px 8px;
		border-radius: 18px;
		background: rgba(11, 10, 12, 0.55);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 1px solid rgba(237, 231, 220, 0.14);
		box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.7);
	}

	.hv-mark {
		display: inline-block;
		font: 400 24px var(--serif);
		color: var(--maroon);
		opacity: 0.8;
		line-height: 0;
		vertical-align: middle;
		margin: 0 4px;
	}

	.hv-quote p {
		font: italic 300 clamp(13.5px, 2.2vh, 15.5px) / 1.75 var(--serif);
		color: var(--cream);
	}

	/* read-along: words start dim and light up as the verse scrolls through */
	.hv-read .word {
		display: inline-block;
		color: var(--cream);
		will-change: transform, opacity, filter;
	}

	.hv-read.is-live .word {
		color: rgba(237, 231, 220, 0.32);
	}

	.hv-verse {
		display: inline-block;
		margin-top: 10px;
		font: 300 9.5px var(--sans);
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: var(--cream-60);
	}
</style>
