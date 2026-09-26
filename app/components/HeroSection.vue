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
				src="https://picsum.photos/seed/kenam-hero/900/1400"
				alt="Dian &amp; Ajeng"
			/>
		</div>
		<div class="hero-shade"></div>

		<!-- Left and Right Incoming Floating Photos / Badges -->
		<div
			class="hero-floats"
			aria-hidden="true"
		>
			<div class="h-float h-float-l">
				<div class="h-float-inner">
					<img
						src="https://picsum.photos/seed/kenam-h1/360/480"
						alt="Dian Hidayat"
					/>
					<div class="h-float-tag">Dian Hidayat</div>
				</div>
			</div>
			<div class="h-float h-float-r">
				<div class="h-float-inner">
					<img
						src="https://picsum.photos/seed/kenam-h4/360/480"
						alt="Ajeng Fauziah"
					/>
					<div class="h-float-tag">Ajeng Fauziah</div>
				</div>
			</div>
		</div>

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

		<div class="hero-quote">
			<span class="quote-mark quote-l">“</span>
			<p>And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He put between you affection and mercy.</p>
			<span class="quote-mark quote-r">”</span>
			<span class="quote-verse">QS. Ar-Rum : 21</span>
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
		padding: 50px 20px 24px;
	}

	.hero-shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(11, 10, 12, 0.65),
			rgba(11, 10, 12, 0.25) 35%,
			rgba(11, 10, 12, 0.2) 60%,
			rgba(11, 10, 12, 0.88)
		);
		pointer-events: none;
	}

	/* Floating Side Photos */
	.hero-floats {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		overflow: hidden;
	}

	.h-float {
		position: absolute;
		width: clamp(80px, 22vw, 115px);
		height: clamp(110px, 30vw, 155px);
		will-change: transform, opacity;
	}

	.h-float-l {
		left: 12px;
		top: 14%;
		transform: rotate(-6deg);
	}

	.h-float-r {
		right: 12px;
		top: 36%;
		transform: rotate(6deg);
	}

	.h-float-inner {
		position: relative;
		width: 100%;
		height: 100%;
		border-radius: 16px;
		overflow: hidden;
		border: 1px solid rgba(237, 231, 220, 0.28);
		box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.85),
			0 0 30px rgba(237, 231, 220, 0.08);
	}

	.h-float-inner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.h-float-tag {
		position: absolute;
		bottom: 6px;
		left: 6px;
		right: 6px;
		background: rgba(11, 10, 12, 0.65);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 999px;
		font: 300 8.5px var(--sans);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		text-align: center;
		padding: 3px 6px;
		color: var(--cream);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.hero-content {
		position: relative;
		z-index: 3;
		margin-top: clamp(40px, 10vh, 80px);
		text-align: center;
		padding: 0 16px;
		width: 100%;
	}

	.hero-eyebrow {
		letter-spacing: 0.45em;
	}

	.hero-names {
		font-family: var(--script);
		font-weight: 400;
		font-size: clamp(54px, 16vw, 76px);
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

	.hero-quote {
		position: relative;
		z-index: 3;
		text-align: center;
		padding: 0 28px;
		max-width: 380px;
		margin-top: auto;
		margin-bottom: 24px;
	}

	.quote-mark {
		display: inline-block;
		font: 400 24px var(--serif);
		color: var(--maroon);
		opacity: 0.8;
		line-height: 0;
		vertical-align: middle;
		margin: 0 4px;
	}

	.hero-quote p {
		font: italic 300 clamp(13.5px, 2.2vh, 15.5px) / 1.75 var(--serif);
		display: inline;
		color: var(--cream);
	}

	.quote-verse {
		display: block;
		margin-top: 10px;
		font: 300 9.5px var(--sans);
		letter-spacing: 0.32em;
		text-transform: uppercase;
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
