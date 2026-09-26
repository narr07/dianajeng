<script setup lang="ts">
	import { ref, onMounted, onUnmounted, computed } from 'vue'
	import { useWishes, type WishItem } from '~/composables/useWishes'
	import { useToast } from '~/composables/useToast'

	const props = defineProps<{
		defaultName?: string
	}>()

	const { wishes, isLoading, isSending, fetchWishes, sendWish, likeWish, subscribeRealtime } =
		useWishes()
	const toast = useToast()

	const name = ref(props.defaultName || '')
	const message = ref('')
	const attendance = ref('Attending')
	const wishListRef = ref<HTMLElement | null>(null)

	let unsubscribe: (() => void) | null = null

	const charCount = computed(() => `${message.value.length}/300`)

	const formatTime = (dateStr: string) => {
		try {
			const date = new Date(dateStr)
			const diffMs = Date.now() - date.getTime()
			const diffMins = Math.floor(diffMs / 60000)
			const diffHours = Math.floor(diffMs / 3600000)
			const diffDays = Math.floor(diffMs / 86400000)

			if (diffMins < 1) return 'Just now'
			if (diffMins < 60) return `${diffMins}m ago`
			if (diffHours < 24) return `${diffHours}h ago`
			return `${diffDays}d ago`
		} catch {
			return 'Just now'
		}
	}

	const handleSubmit = async () => {
		if (!name.value.trim() || !message.value.trim() || isSending.value) return

		try {
			await sendWish(name.value.trim(), message.value.trim(), attendance.value)
			message.value = ''
			toast.show('Thank you! Your warm wish has been sent.')

			// Animate scroll to top of wish list
			if (wishListRef.value) {
				wishListRef.value.scrollTo({ top: 0, behavior: 'smooth' })
			}
		} catch (e) {
			toast.show('Failed to send wish. Please try again.')
		}
	}

	onMounted(async () => {
		await fetchWishes()
		unsubscribe = subscribeRealtime()
	})

	onUnmounted(() => {
		if (unsubscribe) unsubscribe()
	})
</script>

<template>
	<section
		class="sec full snap"
		id="wishes-section"
	>
		<h2 class="script-title">
			<span class="st-mask">
				<span class="st-inner">Wishes &amp; Prayers</span>
			</span>
		</h2>
		<p class="sec-sub reveal">
			Leave your warm wishes and blessings for Dian &amp; Ajeng.
		</p>

		<form
			class="wish-form slide-r"
			@submit.prevent="handleSubmit"
		>
			<div class="field">
				<span class="f-label">Your Name</span>
				<input
					v-model="name"
					type="text"
					maxlength="40"
					placeholder="Full name"
					required
				/>
			</div>

			<div class="field">
				<span class="f-label">Attendance Status</span>
				<div class="attendance-pills">
					<button
						type="button"
						:class="['pill-btn', attendance === 'Attending' ? 'active' : '']"
						@click="attendance = 'Attending'"
					>
						✓ Attending
					</button>
					<button
						type="button"
						:class="['pill-btn', attendance === 'Unable to Attend' ? 'active' : '']"
						@click="attendance = 'Unable to Attend'"
					>
						✕ Unable to Attend
					</button>
					<button
						type="button"
						:class="['pill-btn', attendance === 'Tentative' ? 'active' : '']"
						@click="attendance = 'Tentative'"
					>
						? Tentative
					</button>
				</div>
			</div>

			<div class="field">
				<span class="f-label">
					Blessings &amp; Wishes
					<em class="count">{{ charCount }}</em>
				</span>
				<textarea
					v-model="message"
					maxlength="300"
					placeholder="Write your prayers and warm wishes..."
					required
				></textarea>
			</div>

			<button
				class="btn btn-solid"
				type="submit"
				:disabled="isSending"
			>
				{{ isSending ? 'Sending...' : 'Send Wishes' }}
			</button>
		</form>

		<!-- Messages Stream / Guestbook -->
		<div
			ref="wishListRef"
			class="wish-list reveal"
			id="wishList"
			data-lenis-prevent
		>
			<div
				v-if="wishes.length === 0"
				class="empty-state"
			>
				No wishes yet. Be the first to send your blessings!
			</div>

			<div
				v-for="item in wishes"
				:key="item.id"
				class="wish"
			>
				<span class="ava">
					{{ (item.name.trim()[0] || '•').toUpperCase() }}
				</span>
				<div class="w-body">
					<div class="w-top">
						<h5>{{ item.name }}</h5>
						<span
							v-if="item.attendance"
							:class="['badge-attend', item.attendance === 'Attending' || item.attendance === 'Hadir' ? 'green' : 'gray']"
						>
							{{ item.attendance === 'Hadir' ? 'Attending' : item.attendance === 'Berhalangan' ? 'Unable to Attend' : item.attendance }}
						</span>
						<time>{{ formatTime(item.created_at) }}</time>
					</div>
					<p>{{ item.message }}</p>
					<div class="w-actions">
						<button
							class="like-btn"
							type="button"
							@click="likeWish(item.id)"
						>
							<svg
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
								/>
							</svg>
							<span>{{ item.likes || 0 }}</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
	#wishes-section {
		height: 100vh;
		height: 100dvh;
		min-height: 100dvh;
		max-height: 100dvh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(16px, 3vh, 36px) 24px calc(50px + env(safe-area-inset-bottom));
		box-sizing: border-box;
		overflow: hidden;
	}

	.wish-form {
		margin-top: clamp(8px, 1.5vh, 16px);
		text-align: left;
		width: 100%;
		max-width: 400px;
	}

	.attendance-pills {
		display: flex;
		gap: 6px;
		flex-wrap: wrap;
	}

	.pill-btn {
		background: rgba(237, 231, 220, 0.05);
		border: 1px solid var(--line);
		border-radius: 999px;
		color: var(--cream-60);
		font: 300 10px var(--sans);
		letter-spacing: 0.08em;
		padding: 4px 10px;
		cursor: pointer;
		transition: all 0.25s;
	}

	.pill-btn:hover {
		border-color: rgba(237, 231, 220, 0.35);
		color: var(--cream);
	}

	.pill-btn.active {
		background: rgba(179, 37, 57, 0.25);
		border-color: var(--maroon);
		color: #fff;
	}

	.wish-list {
		margin-top: clamp(10px, 1.8vh, 18px);
		max-height: clamp(120px, 20vh, 200px);
		width: 100%;
		max-width: 400px;
		overflow-y: auto;
		padding-right: 6px;
		text-align: left;
		scrollbar-width: thin;
		scrollbar-color: rgba(237, 231, 220, 0.25) transparent;
	}

	.wish-list::-webkit-scrollbar {
		width: 4px;
	}

	.wish-list::-webkit-scrollbar-thumb {
		background: rgba(237, 231, 220, 0.2);
		border-radius: 4px;
	}

	.wish {
		display: flex;
		gap: 10px;
		padding: 8px 2px;
		border-bottom: 1px solid var(--line);
	}

	.wish:last-child {
		border-bottom: 0;
	}

	.ava {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		flex: none;
		display: grid;
		place-items: center;
		font: 500 13px var(--serif);
		background: rgba(237, 231, 220, 0.07);
		border: 1px solid var(--line);
		color: var(--cream);
	}

	.w-body {
		flex: 1;
	}

	.w-top {
		display: flex;
		align-items: baseline;
		gap: 6px;
		flex-wrap: wrap;
	}

	.w-top h5 {
		font: 400 12px var(--sans);
		letter-spacing: 0.05em;
	}

	.badge-attend {
		font-size: 8.5px;
		letter-spacing: 0.06em;
		padding: 1px 6px;
		border-radius: 999px;
		border: 1px solid var(--line);
	}

	.badge-attend.green {
		color: #7ee787;
		border-color: rgba(126, 231, 135, 0.3);
		background: rgba(126, 231, 135, 0.08);
	}

	.badge-attend.gray {
		color: var(--cream-40);
	}

	.w-top time {
		margin-left: auto;
		font: 300 8.5px var(--sans);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: var(--cream-40);
	}

	.w-body p {
		margin-top: 4px;
		font: 300 12px / 1.5 var(--sans);
		color: var(--cream-60);
		white-space: pre-wrap;
	}

	.w-actions {
		display: flex;
		align-items: center;
		margin-top: 4px;
	}

	.like-btn {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		background: transparent;
		border: none;
		color: var(--cream-40);
		cursor: pointer;
		font-size: 10px;
		transition: color 0.2s, transform 0.2s;
		padding: 2px 0;
	}

	.like-btn svg {
		width: 11px;
		height: 11px;
		fill: currentColor;
	}

	.like-btn:hover {
		color: var(--maroon);
		transform: scale(1.08);
	}

	.empty-state {
		text-align: center;
		padding: 14px 0;
		font: 300 12px var(--sans);
		color: var(--cream-40);
	}
</style>
