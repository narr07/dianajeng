<script setup lang="ts">
	import { useAudio } from '~/composables/useAudio'

	const { isPlaying, toggle } = useAudio()
</script>

<template>
	<div class="float-wrap">
		<button
			class="music-btn"
			:class="{ playing: isPlaying }"
			type="button"
			@click="toggle"
			aria-label="Putar / jeda musik latar"
		>
			<span class="eq">
				<i></i>
				<i></i>
				<i></i>
			</span>
		</button>
	</div>
</template>

<style scoped>
	.float-wrap {
		position: fixed;
		bottom: calc(80px + env(safe-area-inset-bottom));
		left: 0;
		right: 0;
		max-width: 480px;
		margin: 0 auto;
		z-index: 45;
		pointer-events: none;
		display: flex;
		padding: 0 18px;
	}

	.music-btn {
		pointer-events: auto;
		margin-right: auto;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		border: 1px solid var(--line);
		background: rgba(12, 11, 13, 0.7);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		color: var(--cream);
		display: grid;
		place-items: center;
		cursor: pointer;
		transition: transform 0.25s, background 0.25s;
	}

	.music-btn:hover {
		transform: scale(1.06);
		background: rgba(12, 11, 13, 0.85);
	}

	.music-btn:active {
		transform: scale(0.94);
	}

	.eq {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		height: 16px;
	}

	.eq i {
		width: 3px;
		height: 5px;
		border-radius: 2px;
		background: currentColor;
		opacity: 0.5;
		transition: opacity 0.3s;
	}

	.music-btn.playing .eq i {
		opacity: 1;
		animation: eqb 1s ease-in-out infinite;
	}

	.music-btn.playing .eq i:nth-child(2) {
		animation-delay: 0.22s;
	}

	.music-btn.playing .eq i:nth-child(3) {
		animation-delay: 0.44s;
	}

	@keyframes eqb {
		0%,
		100% {
			height: 5px;
		}
		50% {
			height: 16px;
		}
	}
</style>
