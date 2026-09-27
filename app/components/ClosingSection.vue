<script setup lang="ts">
</script>

<template>
	<section class="closing snap">
		<p class="closing-text reveal">
			Our happiness will be complete with your presence and blessing in this celebration of love.
			Thank you for your kind wishes, prayers, love, and attention given.
		</p>
		<figure class="closing-photo ph-mask">
			<img
				loading="lazy"
				src="/gallery/seated.jpg"
				alt="Dian &amp; Ajeng Closing"
			/>
		</figure>
		<h3 class="closing-big slide-l">
			See You On<br />Our Big Day!
		</h3>
		<p class="closing-script slide-r">Dian &amp; Ajeng</p>
		<p class="credit reveal">
			Made with
			<svg
				class="heart"
				viewBox="0 0 24 24"
				fill="currentColor"
			>
				<path
					d="M12 20.3C7.4 16.9 3.6 13.6 3.6 9.9 3.6 7.2 5.7 5.2 8.2 5.2c1.5 0 2.9.8 3.8 2 .9-1.2 2.3-2 3.8-2 2.5 0 4.6 2 4.6 4.7 0 3.7-3.8 7-8.4 10.4z"
				/>
			</svg>
			by <a
				href="https://permadi.dev"
				target="_blank"
				rel="noopener"
			>
				<b>narr07</b>
			</a>
		</p>
	</section>
</template>

<style scoped>
	.closing {
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		padding: 88px 26px 140px;
	}

	.closing-text {
		font: 300 13.5px / 1.9 var(--sans);
		color: var(--cream-60);
		max-width: 34ch;
		margin: 0 auto;
	}

	.closing-photo {
		width: min(66%, 300px);
		aspect-ratio: 4 / 5;
		margin: 30px auto 28px;
	}

	.closing-big {
		font: 400 clamp(25px, 7.6vw, 33px) / 1.45 var(--serif);
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}

	.closing-script {
		font-family: var(--script);
		font-size: clamp(44px, 12vw, 54px);
		margin-top: 10px;
	}

	.credit {
		margin-top: 38px;
		font: 300 10px var(--sans);
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--cream-40);
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.credit b {
		color: var(--cream-60);
		font-weight: 400;
	}

	.credit .heart {
		width: 11px;
		height: 11px;
		color: #C4384D;
	}
</style>
