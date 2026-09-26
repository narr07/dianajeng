<script setup lang="ts">
</script>

<template>
	<div id="couple">
		<!-- Groom -->
		<section class="person snap" id="groom">
			<h2 class="script-title">
				<span class="st-mask">
					<span class="st-inner">The Groom</span>
				</span>
			</h2>
			<div class="orb groom-orb slide-l">
				<img
					src="https://picsum.photos/seed/kenam-groom/700/860"
					alt="Dian Hidayat - Groom"
				/>
			</div>
			<div class="slide-r">
				<h3 class="person-name">Dian Hidayat</h3>
				<p class="person-sub">Son of Mr. &amp; Mrs. Hidayat</p>
			</div>
			<a
				class="ig-link slide-r"
				href="https://instagram.com"
				target="_blank"
				rel="noopener"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<rect
						x="3.5"
						y="3.5"
						width="17"
						height="17"
						rx="4.5"
					/>
					<circle
						cx="12"
						cy="12"
						r="3.8"
					/>
					<circle
						cx="17"
						cy="7"
						r="1"
						fill="currentColor"
						stroke="none"
					/>
				</svg>
				@dianhidayat
			</a>
		</section>

		<!-- Bride -->
		<section class="person snap" id="bride">
			<h2 class="script-title">
				<span class="st-mask">
					<span class="st-inner">The Bride</span>
				</span>
			</h2>
			<div class="orb bride-orb slide-r">
				<img
					src="https://picsum.photos/seed/kenam-bride/700/860"
					alt="Ajeng Fauziah - Bride"
				/>
			</div>
			<div class="slide-l">
				<h3 class="person-name">Ajeng Fauziah</h3>
				<p class="person-sub">Daughter of Mr. &amp; Mrs. Fauzi</p>
			</div>
			<a
				class="ig-link slide-l"
				href="https://instagram.com"
				target="_blank"
				rel="noopener"
			>
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
				>
					<rect
						x="3.5"
						y="3.5"
						width="17"
						height="17"
						rx="4.5"
					/>
					<circle
						cx="12"
						cy="12"
						r="3.8"
					/>
					<circle
						cx="17"
						cy="7"
						r="1"
						fill="currentColor"
						stroke="none"
					/>
				</svg>
				@ajengfauziah
			</a>
		</section>
	</div>
</template>

<style scoped>
	.person {
		padding: clamp(20px, 4vh, 48px) 24px;
		text-align: center;
		position: relative;
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		overflow: hidden;
		background: radial-gradient(
				62% 40% at 50% 36%,
				rgba(237, 231, 220, 0.07),
				transparent 70%
			),
			var(--panel);
	}

	.person-name {
		font: 400 clamp(22px, 3.5vh, 28px) var(--serif);
		letter-spacing: 0.06em;
		margin-top: 2px;
	}

	.person-name i {
		font-style: normal;
		font-size: 0.72em;
		color: var(--cream-60);
	}

	.person-sub {
		margin-top: 6px;
		font: 300 11px var(--sans);
		letter-spacing: 0.28em;
		text-transform: uppercase;
		color: var(--cream-40);
	}

	.orb {
		width: min(56vw, 240px);
		height: clamp(180px, 32vh, 270px);
		margin: clamp(14px, 2.5vh, 24px) auto;
		overflow: hidden;
		border-radius: 48% 48% 46% 46% / 42% 42% 40% 40%;
		box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.85),
			0 0 0 1px var(--line),
			0 0 90px rgba(237, 231, 220, 0.08);
		will-change: transform, opacity;
	}

	.orb img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.ig-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin: clamp(10px, 2vh, 16px) auto 0;
		font: 300 11px var(--sans);
		letter-spacing: 0.26em;
		text-transform: uppercase;
		color: var(--cream-60);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		padding-bottom: 2px;
		transition: color 0.3s, border-color 0.3s;
	}

	.ig-link:hover {
		color: var(--cream);
		border-color: var(--cream-40);
	}

	.ig-link svg {
		width: 14px;
		height: 14px;
	}
</style>
