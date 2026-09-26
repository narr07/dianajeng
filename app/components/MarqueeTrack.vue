<script setup lang="ts">
	defineProps<{
		direction?: 'l' | 'r'
	}>()
</script>

<template>
	<div
		:class="['marquee', direction === 'r' ? 'mq-r' : 'mq-l']"
		aria-hidden="true"
	>
		<div class="mq-track">
			<slot>
				<span>Dian &amp; Ajeng</span>
				<b>✦</b>
				<span>06 · 12 · 2026</span>
				<b>✦</b>
				<span>Forever Begins</span>
				<b>✦</b>
				<span>Dian &amp; Ajeng</span>
				<b>✦</b>
				<span>06 · 12 · 2026</span>
				<b>✦</b>
				<span>Forever Begins</span>
				<b>✦</b>
			</slot>
		</div>
	</div>
</template>

<style scoped>
	.marquee {
		overflow: hidden;
		padding: 26px 0;
		position: relative;
	}

	.mq-track {
		display: inline-flex;
		align-items: center;
		gap: 38px;
		width: max-content;
		white-space: nowrap;
		will-change: transform;
	}

	:deep(.mq-track span) {
		font: italic 300 clamp(38px, 10vw, 54px) / 1.2 var(--serif);
		letter-spacing: 0.04em;
		color: transparent;
		-webkit-text-stroke: 1px rgba(237, 231, 220, 0.42);
	}

	:deep(.mq-track b) {
		font-weight: 400;
		color: var(--maroon);
		font-size: clamp(14px, 4vw, 18px);
	}
</style>
