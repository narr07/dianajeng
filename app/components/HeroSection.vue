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

		<!-- Bride & groom photos -->
		<div
			class="hero-floats"
			aria-hidden="true"
		>
			<div class="h-float h-float-l">
				<div class="h-float-inner">
					<img
						src="/dian.jpeg"
						alt="Dian Hidayat"
					/>
					<div class="h-float-tag">Dian Hidayat</div>
				</div>
			</div>
			<div class="h-float h-float-r">
				<div class="h-float-inner">
					<img
						src="/ajeng.jpeg"
						alt="Ajeng Fauziah"
					/>
					<div class="h-float-tag">Ajeng Fauziah</div>
				</div>
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
			rgba(11, 10, 12, 0.65),
			rgba(11, 10, 12, 0.25) 35%,
			rgba(11, 10, 12, 0.2) 60%,
			rgba(11, 10, 12, 0.88)
		);
		pointer-events: none;
	}

	/* Bride & groom photos */
	.hero-floats {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		gap: clamp(12px, 4vw, 22px);
		width: 100%;
		margin: clamp(28px, 5vh, 48px) 0 clamp(16px, 3vh, 28px);
		pointer-events: none;
	}

	.h-float {
		width: clamp(130px, 40vw, 190px);
		aspect-ratio: 3 / 4;
		will-change: transform, opacity;
	}

	.h-float-l {
		transform: rotate(-6deg);
	}

	.h-float-r {
		margin-top: clamp(22px, 6vw, 36px);
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
		object-position: 50% 22%;
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
		font: 300 9.5px var(--sans);
		letter-spacing: 0.14em;
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
