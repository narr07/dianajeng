<script setup lang="ts">
</script>

<template>
	<section
		class="hero snap"
		id="home"
	>
		<!-- Deep Cinematic Parallax Layer -->
		<div class="parallax">
			<img
				src="/gallery/curtain.jpg"
				alt="Dian &amp; Ajeng"
			/>
		</div>
		<div class="hero-shade"></div>

		<!-- Center Hero Content -->
		<div class="hero-content">
			<p class="eyebrow hero-eyebrow">The Wedding Of</p>
			<h2 class="hero-names">
				<span class="hn-wrap hn-wrap-l">
					<span class="hn hn-l">Dian</span>
				</span>
				<span class="hn-amp">&amp;</span>
				<span class="hn-wrap hn-wrap-r">
					<span class="hn hn-r">Ajeng</span>
				</span>
			</h2>
			<div class="hero-date-wrap">
				<span class="h-line h-line-l"></span>
				<p class="hero-date">06 · 12 · 2026</p>
				<span class="h-line h-line-r"></span>
			</div>
		</div>

		<div class="scroll-hint">
			<span class="hint-label">Scroll to Explore</span>
			<span class="hint-line">
				<i></i>
			</span>
		</div>
	</section>
</template>

<style scoped>
	.hero {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
		/* leave room for the fixed bottom nav */
		padding: 50px 20px calc(92px + env(safe-area-inset-bottom));
	}

	.hero-shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(11, 10, 12, 0.25),
			rgba(11, 10, 12, 0.05) 30%,
			rgba(11, 10, 12, 0.55) 58%,
			rgba(11, 10, 12, 0.9)
		);
		pointer-events: none;
	}

	/* names sit low, over the batik, so the faces at the top stay clear */
	.hero-content {
		position: relative;
		z-index: 3;
		margin-top: auto;
		margin-bottom: clamp(18px, 4vh, 36px);
		text-align: center;
		padding: 0 16px;
		width: 100%;
	}

	.hero-eyebrow {
		letter-spacing: 0.45em;
	}

	.hero-names {
		font-family: var(--script);
		font-style: italic;
		font-weight: 400;
		font-size: clamp(36px, 10.5vw, 50px);
		line-height: 1.05;
		margin-top: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		gap: 6px 12px;
	}

	.hn-wrap {
		display: inline-block;
		overflow: visible;
	}

	.hn {
		display: inline-block;
		will-change: transform, opacity;
	}

	.hn-amp {
		font-size: 0.58em;
		opacity: 0.85;
		color: var(--maroon);
		filter: brightness(1.4);
	}

	.hero-date-wrap {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 16px;
		margin-top: 14px;
	}

	.h-line {
		display: inline-block;
		width: clamp(24px, 8vw, 42px);
		height: 1px;
		background: var(--line);
		will-change: transform;
	}

	.hero-date {
		font: 300 11px var(--sans);
		letter-spacing: 0.45em;
		color: var(--cream-60);
	}

	.scroll-hint {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		padding-bottom: 8px;
	}

	.hint-label {
		font: 300 8.5px var(--sans);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--cream-40);
	}

	.hint-line {
		display: block;
		width: 1px;
		height: 38px;
		background: rgba(237, 231, 220, 0.16);
		overflow: hidden;
		position: relative;
	}

	.hint-line i {
		position: absolute;
		inset: 0;
		background: var(--cream);
		transform: translateY(-110%);
		animation: hintDown 2s cubic-bezier(0.77, 0, 0.18, 1) infinite;
	}

	@keyframes hintDown {
		0% {
			transform: translateY(-110%);
		}
		60%,
		100% {
			transform: translateY(110%);
		}
	}
</style>
