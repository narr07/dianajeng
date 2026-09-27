<script setup lang="ts">
	const photos = [
		{ src: '/1.jpeg', caption: 'Two Hearts' },
		{ src: '/gallery/curtain.jpg', caption: 'One Promise' },
		{ src: '/gallery/umbrella.jpg', caption: 'Hand in Hand' },
		{ src: '/gallery/seated.jpg', caption: 'Side by Side' },
		{ src: '/ajeng.jpeg', caption: 'The Bride' },
		{ src: '/dian.jpeg', caption: 'The Groom' }
	]

	const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
	<section
		class="stack-gallery"
		id="stack-gallery"
	>
		<div class="sg-head">
			<p class="eyebrow">Our Moments</p>
			<h2 class="script-title">
				<span class="st-mask">
					<span class="st-inner">Captured Love</span>
				</span>
			</h2>
		</div>

		<div class="sg-stage">
			<figure
				v-for="(p, i) in photos"
				:key="p.src"
				class="sg-card"
				:style="{ zIndex: i + 1 }"
			>
				<img
					:src="p.src"
					:alt="`Dian & Ajeng — ${p.caption}`"
					decoding="async"
				/>
				<figcaption>
					<span class="sg-cap">{{ p.caption }}</span>
					<span class="sg-num">{{ pad(i + 1) }} / {{ pad(photos.length) }}</span>
				</figcaption>
			</figure>
		</div>
	</section>
</template>

<style scoped>
	.stack-gallery {
		position: relative;
		height: 100vh;
		height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		/* leave room for the fixed bottom nav */
		padding: clamp(36px, 7vh, 64px) 20px calc(92px + env(safe-area-inset-bottom));
		background: radial-gradient(70% 45% at 50% 55%, rgba(179, 37, 57, 0.14), transparent 70%),
			var(--panel);
	}

	.sg-head {
		text-align: center;
		flex: none;
	}

	.sg-stage {
		position: relative;
		flex: 1;
		width: 100%;
		margin-top: clamp(14px, 3vh, 28px);
	}

	.sg-card {
		position: absolute;
		top: 50%;
		left: 50%;
		/* keep the card inside the stage on short screens */
		height: min(100%, calc(min(76vw, 330px) * 1.3));
		aspect-ratio: 1142 / 1490;
		margin: 0;
		translate: -50% -50%;
		border-radius: 18px;
		overflow: hidden;
		background: var(--panel);
		border: 1px solid rgba(227, 192, 141, 0.35);
		box-shadow: 0 30px 60px -24px rgba(0, 0, 0, 0.9);
		transform-origin: 50% 0%;
		will-change: transform, filter;
	}

	.sg-card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 50% 25%;
	}

	.sg-card figcaption {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 40px 16px 14px;
		background: linear-gradient(180deg, transparent, rgba(11, 10, 12, 0.8));
	}

	.sg-cap {
		font-family: var(--script);
		font-size: 30px;
		line-height: 1;
		color: var(--cream);
	}

	.sg-num {
		font: 300 10px var(--sans);
		letter-spacing: 0.28em;
		color: var(--cream-60);
	}
</style>
