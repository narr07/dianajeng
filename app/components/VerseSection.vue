<script setup lang="ts">
	// Split in the template (not in JS) so the full verse is still in the SSR HTML
	const verseWords = 'And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He put between you affection and mercy.'.split(' ')
</script>

<template>
	<section
		class="vs snap"
		id="verse"
	>
		<div
			class="vs-glow"
			aria-hidden="true"
		></div>

		<div class="vs-quote">
			<span class="vs-line"></span>
			<p
				class="vs-read"
				data-read-along
				data-read-along-pin
			>
				<span class="vs-mark">“</span><template
					v-for="(w, i) in verseWords"
					:key="i"
				><span class="word">{{ w }}</span>{{ i < verseWords.length - 1 ? ' ' : '' }}</template><span class="vs-mark">”</span>
			</p>
			<span class="vs-verse">QS. Ar-Rum : 21</span>
			<span class="vs-line"></span>
		</div>
	</section>
</template>

<style scoped>
	.vs {
		position: relative;
		/* exactly one screen tall so the pinned frame has no gap above it */
		width: 100%;
		height: 100vh;
		height: 100svh;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: var(--bg);
		/* leave room for the fixed bottom nav */
		padding: 50px 24px calc(92px + env(safe-area-inset-bottom));
	}

	/* soft warm light behind the verse */
	.vs-glow {
		position: absolute;
		left: 50%;
		top: 46%;
		width: min(120vw, 620px);
		aspect-ratio: 1;
		transform: translate(-50%, -50%);
		background: radial-gradient(circle, rgba(179, 37, 57, 0.16), rgba(227, 192, 141, 0.05) 45%, transparent 70%);
		pointer-events: none;
	}

	.vs-quote {
		position: relative;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
		text-align: center;
		max-width: 400px;
	}

	.vs-line {
		display: block;
		width: 1px;
		height: clamp(28px, 6vh, 48px);
		background: var(--line);
		transform-origin: center;
	}

	.vs-mark {
		display: inline-block;
		font: 400 28px var(--serif);
		color: var(--maroon);
		filter: brightness(1.4);
		opacity: 0.85;
		line-height: 0;
		vertical-align: middle;
		margin: 0 4px;
	}

	.vs-quote p {
		font: 500 clamp(18px, 2.8vh, 21px) / 1.75 var(--serif);
		letter-spacing: 0.01em;
		color: var(--cream);
	}

	/* read-along: words start dim and light up as the verse plays */
	.vs-read .word {
		display: inline-block;
		color: var(--cream);
	}

	.vs-read.is-live .word {
		color: rgba(237, 231, 220, 0.32);
	}

	.vs-verse {
		display: inline-block;
		font: 300 10px var(--sans);
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: var(--cream-60);
	}
</style>
