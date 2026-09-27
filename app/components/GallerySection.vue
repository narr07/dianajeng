<script setup lang="ts">
</script>

<template>
	<section
		class="h-wrap snap"
		id="gallery"
	>
		<div
			class="h-track"
			id="hTrack"
		>
			<div class="h-card h-intro">
				<p class="eyebrow">Gallery</p>
				<h2
					class="script-title"
					style="font-size: clamp(52px, 15vw, 72px)"
				>
					Our Moments
				</h2>
				<p>A collection of laughter, quiet glances, and everything in between.</p>
				<span class="swipe-hint">
					Keep scrolling
					<svg
						viewBox="0 0 26 12"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M1 6h22M19 2l4 4-4 4" />
					</svg>
				</span>
			</div>
			<figure class="h-card h-photo">
				<img
					src="/gallery/curtain.jpg"
					alt="Gallery Moment 1"
				/>
			</figure>
			<figure class="h-card h-tall">
				<img
					src="/ajeng.jpeg"
					alt="Gallery Moment 2"
				/>
			</figure>
			<div
				class="h-card h-photo video-card"
			>
				<img
					src="/gallery/umbrella.jpg"
					alt="Prewedding film"
					class="video-bg"
				/>
				<span class="play-icon">
					<svg
						viewBox="0 0 24 24"
						fill="currentColor"
					>
						<path d="M8 5.5v13l11-6.5z" />
					</svg>
				</span>
				<span class="video-tag">Prewedding Film ▸ Youtube</span>
			</div>
			<figure class="h-card h-tall">
				<img
					src="/dian.jpeg"
					alt="Gallery Moment 4"
				/>
			</figure>
			<figure class="h-card h-photo">
				<img
					src="/gallery/seated.jpg"
					alt="Gallery Moment 5"
				/>
			</figure>
			<figure class="h-card h-tall">
				<img
					src="/1.jpeg"
					alt="Gallery Moment 6"
				/>
			</figure>
			<div class="h-card h-end">
				<h2
					class="script-title"
					style="font-size: clamp(40px, 11vw, 54px)"
				>
					Dian &amp; Ajeng
				</h2>
				<p>06 · 12 · 2026</p>
			</div>
		</div>
		<div class="h-progress">
			<i></i>
		</div>
	</section>
</template>

<style scoped>
	.h-wrap {
		position: relative;
		height: 100vh;
		height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 22px;
		overflow: hidden;
		padding: 60px 0 34px;
	}

	.h-track {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 0 26px;
		width: max-content;
		will-change: transform;
	}

	.h-card {
		flex: 0 0 auto;
	}

	.h-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 25%;
		border-radius: 18px;
	}

	.h-photo {
		width: min(64vw, 290px);
		height: min(52vh, 410px);
	}

	.h-tall {
		width: min(56vw, 255px);
		height: min(62vh, 480px);
	}

	.h-intro {
		width: min(70vw, 320px);
		padding-right: 10px;
		text-align: left;
	}

	.h-intro p {
		font: 300 13.5px / 1.8 var(--sans);
		color: var(--cream-60);
		max-width: 26ch;
		margin-top: 4px;
	}

	.h-end {
		width: min(58vw, 270px);
		text-align: center;
	}

	.h-end .script-title {
		margin-bottom: 4px;
	}

	.h-end p {
		font: 300 10.5px var(--sans);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--cream-40);
	}

	.swipe-hint {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		margin-top: 22px;
		font: 300 10px var(--sans);
		letter-spacing: 0.32em;
		text-transform: uppercase;
		color: var(--cream-60);
	}

	.swipe-hint svg {
		width: 26px;
		height: 12px;
		animation: swipeArr 1.6s ease-in-out infinite;
	}

	@keyframes swipeArr {
		0%,
		100% {
			transform: translateX(-5px);
			opacity: 0.5;
		}
		50% {
			transform: translateX(5px);
			opacity: 1;
		}
	}

	.h-progress {
		height: 2px;
		background: var(--line);
		margin: 0 26px;
		border-radius: 2px;
		overflow: hidden;
	}

	.h-progress i {
		display: block;
		height: 100%;
		width: 100%;
		background: var(--cream);
		transform: scaleX(0);
		transform-origin: left;
	}

	.video-card {
		position: relative;
		border-radius: 18px;
		overflow: hidden;
		box-shadow: 0 24px 60px -30px rgba(0, 0, 0, 0.9);
	}

	.video-bg {
		position: absolute;
		inset: 0;
	}

	.play-icon {
		position: absolute;
		inset: 0;
		margin: auto;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: rgba(11, 10, 12, 0.55);
		backdrop-filter: blur(4px);
		border: 1px solid var(--line);
		display: grid;
		place-items: center;
		color: #fff;
		z-index: 2;
	}

	.play-icon svg {
		width: 18px;
		height: 18px;
	}

	.video-tag {
		position: absolute;
		left: 12px;
		bottom: 12px;
		font: 300 10px var(--sans);
		letter-spacing: 0.08em;
		background: rgba(11, 10, 12, 0.6);
		padding: 6px 12px;
		border-radius: 999px;
		z-index: 2;
	}
</style>
