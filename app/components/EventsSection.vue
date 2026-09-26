<script setup lang="ts">
</script>

<template>
	<div id="events-group">
		<!-- Holy Matrimony -->
		<section class="ev-page snap">
			<div class="event-card slide-l">
				<p class="ev-date-badge">Sunday, 6 December 2026</p>
				<h3 class="ev-title">
					Holy<br />Matrimony
				</h3>
				<p class="ev-time">08.00 — 10.00 WIB</p>
				<p class="ev-venue">Grand Ballroom — Islamic Center Majalengka</p>
				<p class="ev-addr">
					Jl. K.H. Abdul Halim No. 1, Majalengka Kulon, Majalengka, West Java 45418, Indonesia
				</p>
				<a
					class="btn"
					target="_blank"
					rel="noopener"
					href="https://maps.google.com/?q=Islamic+Center+Majalengka"
				>
					Get Directions
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M7 17 17 7M9 7h8v8" />
					</svg>
				</a>
			</div>
		</section>

		<!-- Wedding Reception -->
		<section class="ev-page snap">
			<div class="event-card slide-r">
				<p class="ev-date-badge">Sunday, 6 December 2026</p>
				<h3 class="ev-title">
					Wedding<br />Reception
				</h3>
				<p class="ev-time">11.30 WIB — 14.00 WIB</p>
				<p class="ev-venue">Grand Ballroom — Islamic Center Majalengka</p>
				<p class="ev-addr">
					Jl. K.H. Abdul Halim No. 1, Majalengka Kulon, Majalengka, West Java 45418, Indonesia
				</p>
				<a
					class="btn"
					target="_blank"
					rel="noopener"
					href="https://maps.google.com/?q=Islamic+Center+Majalengka"
				>
					Get Directions
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M7 17 17 7M9 7h8v8" />
					</svg>
				</a>
			</div>
		</section>
	</div>
</template>

<style scoped>
	.ev-page {
		min-height: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: clamp(30px, 5vh, 60px) 24px;
		box-sizing: border-box;
		overflow: hidden;
	}

	.ev-date-badge {
		display: inline-block;
		font: 300 11px var(--sans);
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--gold-light, #e0b070);
		margin-bottom: 12px;
	}

	.event-card {
		border: 1px solid var(--line);
		border-radius: 18px;
		padding: clamp(24px, 4vh, 36px) 22px;
		text-align: center;
		background: rgba(237, 231, 220, 0.025);
		width: 100%;
		max-width: 420px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
	}

	.ev-title {
		font: 400 clamp(22px, 3.5vh, 28px) / 1.2 var(--serif);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.ev-time {
		margin-top: 10px;
		font: 300 12px var(--sans);
		letter-spacing: 0.3em;
		text-transform: uppercase;
		color: var(--cream-60);
	}

	.ev-venue {
		margin-top: 12px;
		font: 500 16px var(--serif);
		letter-spacing: 0.05em;
	}

	.ev-addr {
		margin: 8px auto 0;
		font: 300 12px / 1.6 var(--sans);
		color: var(--cream-40);
		max-width: 30ch;
	}

	.event-card .btn {
		margin-top: clamp(16px, 2.5vh, 22px);
	}
</style>
