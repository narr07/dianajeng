<script setup lang="ts">
	import { ref, onMounted, onUnmounted, computed } from 'vue'
	import { useWishes, type Attendance } from '~/composables/useWishes'
	import { useToast } from '~/composables/useToast'

	const props = defineProps<{
		defaultName?: string
	}>()

	const {
		wishes,
		isLoading,
		isSending,
		isLiked,
		fetchWishes,
		sendWish,
		likeWish,
		subscribeRealtime
	} = useWishes()
	const toast = useToast()

	const name = ref(props.defaultName || '')
	const message = ref('')
	const attendance = ref<Attendance>('yes')
	const wishListRef = ref<HTMLElement | null>(null)

	let unsubscribe: (() => void) | null = null

	const charCount = computed(() => `${message.value.length}/300`)
	const canSend = computed(() => !!name.value.trim() && !!message.value.trim() && !isSending.value)

	const attendanceOptions: { value: Attendance; label: string }[] = [
		{ value: 'yes', label: 'Attending' },
		{ value: 'maybe', label: 'Maybe' },
		{ value: 'no', label: 'Can’t Make It' }
	]

	// Stored as a neutral code shared with the Indonesian site; older free-text
	// values (English or Indonesian) are still understood
	const attendanceTone = (a?: string): Attendance => {
		if (!a || ['yes', 'Attending', 'Hadir'].includes(a)) return 'yes'
		if (['maybe', 'Tentative', 'Mungkin', 'Masih ragu'].includes(a)) return 'maybe'
		return 'no'
	}
	const attendanceLabel = (a?: string) =>
		({ yes: 'Attending', maybe: 'Maybe', no: 'Can’t Make It' })[attendanceTone(a)]

	const initials = (n: string) =>
		n
			.trim()
			.split(/\s+/)
			.slice(0, 2)
			.map((p) => p[0]?.toUpperCase() || '')
			.join('') || '•'

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
			if (diffDays < 7) return `${diffDays}d ago`
			return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
		} catch {
			return 'Just now'
		}
	}

	const handleSubmit = async () => {
		if (!canSend.value) return

		try {
			await sendWish(name.value.trim(), message.value.trim(), attendance.value)
			message.value = ''
			toast.show('Thank you! Your wish has been sent.')

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
		class="sec"
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
			<label class="field">
				<span class="f-label">Your Name</span>
				<input
					v-model="name"
					type="text"
					maxlength="40"
					placeholder="Your full name"
					autocomplete="name"
					required
				/>
			</label>

			<div class="field">
				<span class="f-label">Will you attend?</span>
				<div
					class="attendance-pills"
					role="radiogroup"
				>
					<button
						v-for="opt in attendanceOptions"
						:key="opt.value"
						type="button"
						role="radio"
						:aria-checked="attendance === opt.value"
						:class="['pill-btn', { active: attendance === opt.value }]"
						@click="attendance = opt.value"
					>
						{{ opt.label }}
					</button>
				</div>
			</div>

			<label class="field">
				<span class="f-label">
					Your Wishes
					<em class="count">{{ charCount }}</em>
				</span>
				<textarea
					v-model="message"
					maxlength="300"
					rows="4"
					placeholder="Write your prayers and warm wishes…"
					required
				></textarea>
			</label>

			<button
				class="btn btn-red send-btn"
				type="submit"
				:disabled="!canSend"
			>
				{{ isSending ? 'Sending…' : 'Send Wishes' }}
			</button>
		</form>

		<!-- Guestbook -->
		<div class="wish-head reveal">
			<span class="wish-count">
				{{ wishes.length }} {{ wishes.length === 1 ? 'Wish' : 'Wishes' }}
			</span>
			<span class="live-dot">Live</span>
		</div>

		<div
			ref="wishListRef"
			class="wish-list reveal"
			id="wishList"
			data-lenis-prevent
		>
			<template v-if="isLoading">
				<div
					v-for="n in 3"
					:key="n"
					class="wish skeleton"
				>
					<span class="ava"></span>
					<div class="w-body">
						<i></i>
						<i></i>
					</div>
				</div>
			</template>

			<div
				v-else-if="wishes.length === 0"
				class="empty-state"
			>
				No wishes yet — be the first to send your blessings.
			</div>

			<TransitionGroup
				v-else
				name="wish"
				tag="div"
			>
				<article
					v-for="item in wishes"
					:key="item.id"
					:class="['wish', { pending: item.id.startsWith('opt-') }]"
				>
					<span class="ava">{{ initials(item.name) }}</span>
					<div class="w-body">
						<div class="w-top">
							<h5>{{ item.name }}</h5>
							<time>{{ formatTime(item.created_at) }}</time>
						</div>
						<span
							v-if="item.attendance"
							:class="['badge-attend', attendanceTone(item.attendance)]"
						>
							{{ attendanceLabel(item.attendance) }}
						</span>
						<p>{{ item.message }}</p>
						<button
							:class="['like-btn', { liked: isLiked(item.id) }]"
							type="button"
							:aria-pressed="isLiked(item.id)"
							:aria-label="isLiked(item.id) ? 'Liked' : 'Like this wish'"
							@click="likeWish(item.id)"
						>
							<svg viewBox="0 0 24 24">
								<path
									d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
								/>
							</svg>
							<span>{{ item.likes || 0 }}</span>
						</button>
					</div>
				</article>
			</TransitionGroup>
		</div>
	</section>
</template>

<style scoped>
	#wishes-section {
		min-height: 100vh;
		min-height: 100svh;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* leave room for the fixed bottom nav */
		padding: clamp(48px, 8vh, 72px) 20px calc(110px + env(safe-area-inset-bottom));
	}

	.wish-form {
		margin-top: 22px;
		text-align: left;
		width: 100%;
		max-width: 420px;
		padding: 22px 18px 20px;
		border-radius: 20px;
		background: rgba(237, 231, 220, 0.04);
		border: 1px solid var(--line);
	}

	.wish-form .field {
		display: block;
		margin-bottom: 16px;
	}

	.wish-form .f-label {
		font-size: 11px;
		letter-spacing: 0.2em;
		margin-bottom: 8px;
		color: var(--cream-60);
	}

	/* 16px keeps iOS Safari from zooming the page when a field is focused */
	.wish-form input,
	.wish-form textarea {
		font-size: 16px;
		padding: 13px 15px;
	}

	.wish-form textarea {
		min-height: 112px;
	}

	.attendance-pills {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	.pill-btn {
		min-height: 44px;
		padding: 8px 6px;
		border-radius: 12px;
		border: 1px solid var(--line);
		background: rgba(237, 231, 220, 0.05);
		color: var(--cream-60);
		font: 400 13px var(--sans);
		letter-spacing: 0.02em;
		cursor: pointer;
		transition: background 0.25s, border-color 0.25s, color 0.25s;
	}

	.pill-btn.active {
		background: rgba(179, 37, 57, 0.28);
		border-color: rgba(214, 92, 108, 0.8);
		color: #fff;
	}

	.send-btn {
		max-width: none;
		min-height: 50px;
		margin-top: 4px;
		font-size: 12.5px;
	}

	.send-btn:disabled {
		opacity: 0.45;
		cursor: not-allowed;
		box-shadow: none;
	}

	.wish-head {
		width: 100%;
		max-width: 420px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 32px;
		padding: 0 4px 12px;
		border-bottom: 1px solid var(--line);
	}

	.wish-count {
		font: 400 13px var(--sans);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--cream);
	}

	.live-dot {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font: 400 11px var(--sans);
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--cream-40);
	}

	.live-dot::before {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #7ee787;
		box-shadow: 0 0 0 0 rgba(126, 231, 135, 0.6);
		animation: livePulse 2s infinite;
	}

	@keyframes livePulse {
		70% {
			box-shadow: 0 0 0 7px rgba(126, 231, 135, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(126, 231, 135, 0);
		}
	}

	.wish-list {
		width: 100%;
		max-width: 420px;
		max-height: min(62vh, 560px);
		overflow-y: auto;
		overscroll-behavior: contain;
		text-align: left;
		padding: 4px 4px 4px 0;
		scrollbar-width: thin;
		scrollbar-color: rgba(237, 231, 220, 0.25) transparent;
		-webkit-mask-image: linear-gradient(180deg, #000 88%, transparent);
		mask-image: linear-gradient(180deg, #000 88%, transparent);
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
		gap: 12px;
		padding: 16px 4px;
		border-bottom: 1px solid var(--line);
	}

	.wish.pending {
		opacity: 0.6;
	}

	.ava {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		flex: none;
		display: grid;
		place-items: center;
		font: 500 15px var(--serif);
		letter-spacing: 0.04em;
		color: var(--cream);
		background: linear-gradient(145deg, rgba(179, 37, 57, 0.45), rgba(227, 192, 141, 0.25));
		border: 1px solid rgba(227, 192, 141, 0.3);
	}

	.w-body {
		flex: 1;
		min-width: 0;
	}

	.w-top {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	.w-top h5 {
		font: 500 15px var(--sans);
		letter-spacing: 0.02em;
		color: var(--cream);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.w-top time {
		margin-left: auto;
		flex: none;
		font: 300 11.5px var(--sans);
		color: var(--cream-40);
	}

	.badge-attend {
		display: inline-block;
		margin-top: 5px;
		font: 400 11px var(--sans);
		letter-spacing: 0.04em;
		padding: 2px 9px;
		border-radius: 999px;
		border: 1px solid var(--line);
		color: var(--cream-40);
	}

	.badge-attend.yes {
		color: #7ee787;
		border-color: rgba(126, 231, 135, 0.3);
		background: rgba(126, 231, 135, 0.08);
	}

	.badge-attend.maybe {
		color: #e3c08d;
		border-color: rgba(227, 192, 141, 0.35);
		background: rgba(227, 192, 141, 0.08);
	}

	.w-body p {
		margin-top: 8px;
		font: 300 14.5px / 1.65 var(--sans);
		color: rgba(237, 231, 220, 0.85);
		white-space: pre-wrap;
		overflow-wrap: anywhere;
	}

	.like-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 36px;
		margin-top: 6px;
		padding: 6px 12px 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--line);
		background: transparent;
		color: var(--cream-40);
		font: 400 13px var(--sans);
		cursor: pointer;
		transition: color 0.2s, border-color 0.2s, background 0.2s;
	}

	.like-btn svg {
		width: 15px;
		height: 15px;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
	}

	.like-btn.liked {
		color: #e06c7e;
		border-color: rgba(224, 108, 126, 0.4);
		background: rgba(179, 37, 57, 0.12);
		cursor: default;
	}

	.like-btn.liked svg {
		fill: currentColor;
		animation: likePop 0.35s ease-out;
	}

	@keyframes likePop {
		50% {
			transform: scale(1.3);
		}
	}

	.empty-state {
		text-align: center;
		padding: 28px 12px;
		font: 300 14px / 1.6 var(--sans);
		color: var(--cream-40);
	}

	/* loading placeholders */
	.skeleton .ava {
		background: rgba(237, 231, 220, 0.06);
		border-color: transparent;
	}

	.skeleton i {
		display: block;
		height: 12px;
		margin: 6px 0 10px;
		border-radius: 6px;
		background: rgba(237, 231, 220, 0.07);
		animation: skel 1.4s ease-in-out infinite;
	}

	.skeleton i + i {
		width: 70%;
	}

	@keyframes skel {
		50% {
			opacity: 0.4;
		}
	}

	/* new wishes slide in at the top */
	.wish-enter-active {
		transition: opacity 0.5s ease, transform 0.5s ease;
	}

	.wish-enter-from {
		opacity: 0;
		transform: translateY(-12px);
	}

	@media (prefers-reduced-motion: reduce) {
		.live-dot::before,
		.like-btn.liked svg {
			animation: none;
		}
	}
</style>
