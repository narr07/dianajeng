<script setup lang="ts">
	import MarqueeTrack from '~/components/MarqueeTrack.vue'
</script>

<template>
	<section class="save-date snap">
		<!-- Parallax Background Layer -->
		<div class="parallax">
			<img
				src="https://picsum.photos/seed/kenam-date/900/1300"
				alt="Save The Date Background"
			/>
		</div>
		<div class="sd-shade"></div>

		<!-- Main Content with Left Typography and Right Photo -->
		<div class="sd-inner">
			<div class="sd-content-grid">
				<div class="sd-left">
					<p class="eyebrow slide-l">Wedding Announcement</p>
					<div
						class="sd-date"
						aria-label="6 December 2026"
					>
						<span class="sd-r sd-num-l">06</span>
						<span class="sd-r sd-num-r">DEC</span>
						<span class="sd-r sd-num-l">2026</span>
					</div>
					<p class="sd-script slide-l">Save the date</p>
				</div>

				<div class="sd-right">
					<div class="sd-photo-card slide-r">
						<div class="sd-photo-inner">
							<img
								src="https://picsum.photos/seed/kenam-date2/420/560"
								alt="Dian &amp; Ajeng Save the Date"
							/>
							<div class="sd-card-glass">
								<span>Majalengka, West Java</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Integrated Marquee Ticker at the bottom of the section -->
			<div class="sd-marquee-wrap">
				<MarqueeTrack direction="l" />
			</div>
		</div>
	</section>
</template>

<style scoped>
	.save-date {
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		overflow: hidden;
	}

	.sd-shade {
		position: absolute;
		inset: 0;
		z-index: 1;
		background: linear-gradient(
			180deg,
			rgba(11, 10, 12, 0.45),
			rgba(11, 10, 12, 0.15) 40%,
			rgba(11, 10, 12, 0.92) 80%
		);
		pointer-events: none;
	}

	.sd-inner {
		position: relative;
		z-index: 2;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.sd-content-grid {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		padding: 40px 24px 20px;
		gap: 20px;
	}

	.sd-left {
		flex: 1;
	}

	.sd-date {
		font: 300 clamp(52px, 16vw, 76px) / 0.92 var(--serif);
		letter-spacing: 0.02em;
		margin: 8px 0;
	}

	.sd-date .sd-r {
		display: block;
		will-change: transform;
	}

	.sd-script {
		font-family: var(--script);
		font-size: clamp(34px, 9vw, 44px);
		opacity: 0.95;
		margin-top: 4px;
	}

	.sd-right {
		flex: 0 0 clamp(110px, 32vw, 150px);
	}

	.sd-photo-card {
		transform: rotate(3deg);
		will-change: transform, opacity;
	}

	.sd-photo-inner {
		position: relative;
		width: 100%;
		height: clamp(150px, 24vh, 200px);
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid rgba(237, 231, 220, 0.28);
		box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.85);
	}

	.sd-photo-inner img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.sd-card-glass {
		position: absolute;
		bottom: 8px;
		left: 8px;
		right: 8px;
		background: rgba(11, 10, 12, 0.6);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 999px;
		font: 300 8.5px var(--sans);
		letter-spacing: 0.15em;
		text-transform: uppercase;
		text-align: center;
		padding: 3px 6px;
		color: var(--cream-60);
	}

	.sd-marquee-wrap {
		width: 100%;
		border-top: 1px solid var(--line);
		background: rgba(11, 10, 12, 0.6);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	:deep(.marquee) {
		padding: 14px 0;
	}
</style>
