<script setup lang="ts">
	const props = defineProps<{
		activeSection: string
	}>()

	const emit = defineEmits<{
		(e: 'navigate', target: string): void
	}>()

	const handleClick = (e: MouseEvent, target: string) => {
		e.preventDefault()
		emit('navigate', target)
	}
</script>

<template>
	<nav
		class="bottom-nav"
		id="bottomNav"
	>
		<a
			href="#home"
			:class="{ active: activeSection === 'home' }"
			@click="(e) => handleClick(e, '#home')"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M3 11l9-8 9 8" />
				<path d="M5 10v10h14V10" />
			</svg>
			<span>Home</span>
		</a>
		<a
			href="#couple"
			:class="{ active: activeSection === 'couple' }"
			@click="(e) => handleClick(e, '#couple')"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle
					cx="9"
					cy="8"
					r="3.2"
				/>
				<path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5" />
				<path d="M15.5 5.6a3.2 3.2 0 1 1 0 4.9M16.8 14.7c2 .5 3.3 1.9 3.7 4.3" />
			</svg>
			<span>Couple</span>
		</a>
		<a
			href="#event"
			:class="{ active: activeSection === 'event' }"
			@click="(e) => handleClick(e, '#event')"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect
					x="3.5"
					y="5"
					width="17"
					height="15.5"
					rx="2.5"
				/>
				<path d="M3.5 9.5h17M8 3v4M16 3v4" />
			</svg>
			<span>Event</span>
		</a>
		<a
			href="#gallery"
			:class="{ active: activeSection === 'gallery' }"
			@click="(e) => handleClick(e, '#gallery')"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect
					x="3.5"
					y="4.5"
					width="17"
					height="15"
					rx="2.5"
				/>
				<circle
					cx="9"
					cy="10"
					r="1.6"
				/>
				<path d="M4.5 17.5l4.5-4 3 2.5 3.5-3.5 4 4" />
			</svg>
			<span>Gallery</span>
		</a>
		<a
			href="#gift"
			:class="{ active: activeSection === 'gift' }"
			@click="(e) => handleClick(e, '#gift')"
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect
					x="4"
					y="8"
					width="16"
					height="4"
					rx="1"
				/>
				<path d="M6 12v8h12v-8M12 8v12M12 8s-4.5.2-4.5-2.5C7.5 3.6 12 4.5 12 8zm0 0s4.5.2 4.5-2.5C16.5 3.6 12 4.5 12 8z" />
			</svg>
			<span>Gift</span>
		</a>
	</nav>
</template>

<style scoped>
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		max-width: 480px;
		margin: 0 auto;
		z-index: 46;
		display: flex;
		background: rgba(12, 11, 13, 0.85);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border-top: 1px solid var(--line);
		padding: 6px 8px calc(8px + env(safe-area-inset-bottom));
	}

	.bottom-nav a {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
		padding: 8px 0 2px;
		color: var(--cream);
		opacity: 0.42;
		text-decoration: none;
		font-size: 8.5px;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		transition: opacity 0.3s;
	}

	.bottom-nav a svg {
		width: 19px;
		height: 19px;
	}

	.bottom-nav a::after {
		content: '';
		width: 3px;
		height: 3px;
		border-radius: 50%;
		background: currentColor;
		opacity: 0;
		transform: scale(0.4);
		transition: 0.3s;
		margin-top: 2px;
	}

	.bottom-nav a.active {
		opacity: 1;
	}

	.bottom-nav a.active::after {
		opacity: 0.9;
		transform: scale(1);
	}
</style>
