<script setup lang="ts">
	// Both ceremonies are held at the same place
	const LAT = -6.824918322911508
	const LNG = 108.34005879749994

	const venue = {
		name: 'Alun-alun Desa Pajajar',
		address: 'Desa Pajajar, Kec. Rajagaluh, Kab. Majalengka, West Java, Indonesia',
		// opens the Google Maps app on phones, the website on desktop
		directions: `https://www.google.com/maps/dir/?api=1&destination=${LAT},${LNG}`,
		embed: `https://maps.google.com/maps?q=${LAT},${LNG}&z=16&hl=en&output=embed`
	}
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
				<p class="ev-venue">{{ venue.name }}</p>
				<p class="ev-addr">
					{{ venue.address }}
				</p>
				<a
					class="btn"
					target="_blank"
					rel="noopener"
					:href="venue.directions"
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
				<p class="ev-venue">{{ venue.name }}</p>
				<p class="ev-addr">
					{{ venue.address }}
				</p>
				<a
					class="btn"
					target="_blank"
					rel="noopener"
					:href="venue.directions"
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
		<!-- Location map -->
		<section
			class="ev-page ev-map-page snap"
			id="location"
		>
			<div class="map-card reveal">
				<p class="ev-date-badge">Location</p>
				<h3 class="ev-title">{{ venue.name }}</h3>
				<p class="ev-addr">{{ venue.address }}</p>
				<div class="map-frame">
					<iframe
						:src="venue.embed"
						title="Map to Alun-alun Desa Pajajar"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						allowfullscreen
					></iframe>
				</div>
				<a
					class="btn btn-red"
					target="_blank"
					rel="noopener"
					:href="venue.directions"
				>
					Open in Google Maps
					<svg
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M12 21s-7-6.3-7-12a7 7 0 0 1 14 0c0 5.7-7 12-7 12z" />
						<circle
							cx="12"
							cy="9"
							r="2.5"
						/>
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

	.map-card {
		width: 100%;
		max-width: 420px;
		text-align: center;
	}

	.map-frame {
		position: relative;
		margin: 18px 0 20px;
		aspect-ratio: 4 / 3;
		border-radius: 18px;
		overflow: hidden;
		border: 1px solid rgba(227, 192, 141, 0.35);
		box-shadow: 0 24px 50px -24px rgba(0, 0, 0, 0.9);
		background: rgba(237, 231, 220, 0.04);
	}

	/* recolour the default light map to sit in the dark theme */
	.map-frame iframe {
		width: 100%;
		height: 100%;
		border: 0;
		filter: invert(0.9) hue-rotate(180deg) saturate(0.6) brightness(0.95);
	}

	.map-card .btn {
		max-width: none;
	}
</style>
