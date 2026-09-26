<script setup lang="ts">
</script>

<template>
	<div id="story-group">
		<section
			class="story-page snap"
			id="story"
		>
			<h2 class="script-title">
				<span class="st-mask">
					<span class="st-inner">Love Story</span>
				</span>
			</h2>
			<article class="story-block">
				<div class="story-photo">
					<img
						loading="lazy"
						src="https://picsum.photos/seed/kenam-s1/720/560"
						alt="When we first met"
					/>
				</div>
				<div class="story-txt slide-l">
					<h4>When we first met</h4>
					<p>
						It started with a simple hello on a rainy Tuesday — a shared table at a small
						coffee shop, one umbrella, and a conversation that neither of us wanted to end.
					</p>
				</div>
			</article>
		</section>

		<section class="story-page snap">
			<article class="story-block right">
				<div class="story-photo">
					<img
						loading="lazy"
						src="https://picsum.photos/seed/kenam-s2/720/560"
						alt="Relationship"
					/>
				</div>
				<div class="story-txt slide-r">
					<h4>Relationship</h4>
					<p>
						From road trips and late-night talks to quiet Sunday mornings, every moment
						taught us one thing: home is not a place, it is a person — and we found ours in
						each other.
					</p>
				</div>
			</article>
		</section>
	</div>
</template>

<style scoped>
	.story-page {
		height: 100vh;
		height: 100dvh;
		min-height: 100dvh;
		max-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: clamp(20px, 4vh, 48px) 24px;
		box-sizing: border-box;
		overflow: hidden;
	}

	.story-block {
		margin-top: clamp(14px, 2.5vh, 24px);
		text-align: left;
		width: 100%;
		max-width: 380px;
	}

	.story-block.right {
		text-align: right;
	}

	.story-photo {
		width: 80%;
		height: clamp(160px, 26vh, 230px);
		overflow: hidden;
		border-radius: 18px;
		will-change: clip-path, transform;
	}

	.story-photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.story-block.right .story-photo {
		margin-left: auto;
	}

	.story-txt {
		margin-top: clamp(10px, 1.8vh, 16px);
	}

	.story-txt h4 {
		font: 400 clamp(18px, 2.8vh, 22px) var(--serif);
		letter-spacing: 0.08em;
	}

	.story-txt p {
		margin-top: 6px;
		font: 300 clamp(11.5px, 1.7vh, 13px) / 1.65 var(--sans);
		color: var(--cream-60);
	}
</style>
