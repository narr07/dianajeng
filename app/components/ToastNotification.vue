<script setup lang="ts">
	import { useToast } from '~/composables/useToast'

	const { message, isVisible } = useToast()
</script>

<template>
	<transition name="toast-fade">
		<div
			v-if="isVisible"
			class="toast"
			id="toast"
		>
			{{ message }}
		</div>
	</transition>
</template>

<style scoped>
	.toast {
		position: fixed;
		bottom: calc(88px + env(safe-area-inset-bottom));
		left: 50%;
		transform: translateX(-50%);
		z-index: 80;
		background: rgba(20, 19, 22, 0.94);
		border: 1px solid var(--line);
		color: var(--cream);
		font: 300 12px var(--sans);
		letter-spacing: 0.1em;
		padding: 11px 20px;
		border-radius: 999px;
		pointer-events: none;
		backdrop-filter: blur(8px);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	}

	.toast-fade-enter-active,
	.toast-fade-leave-active {
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.toast-fade-enter-from {
		opacity: 0;
		transform: translate(-50%, 14px);
	}

	.toast-fade-leave-to {
		opacity: 0;
		transform: translate(-50%, -10px);
	}
</style>
