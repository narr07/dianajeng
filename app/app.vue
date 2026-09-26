<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
	import { useGSAP } from '~/composables/useGSAP'
	import { useAudio } from '~/composables/useAudio'

	const route = useRoute()
	const { gsap, ScrollTrigger } = useGSAP()
	const { play: startMusic } = useAudio()

	const containerRef = ref<HTMLElement | null>(null)
	const isOpened = ref(false)
	const activeSection = ref('home')
	const guestName = computed(() => {
		const to = route.query.to
		if (Array.isArray(to)) return to[0] || 'Honored Guest'
		return to || 'Honored Guest'
	})

	let ctx: gsap.Context | null = null

	const navigateTo = (targetSelector: string) => {
		const targetEl = document.querySelector(targetSelector)
		if (targetEl) {
			gsap.to(window, {
				duration: 0.85,
				scrollTo: { y: targetEl, autoKill: false },
				ease: 'power2.inOut'
			})
		}
	}

	const initAnimations = () => {
		if (!containerRef.value) return

		ctx = gsap.context(() => {
			// Music button and bottom nav initially hidden until opened
			gsap.set(
				['.music-btn', '.bottom-nav'],
				{ opacity: 0, y: 22 }
			)

			// Scroll animations
			gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
				gsap.from(
					el,
					{
						y: 40,
						opacity: 0,
						duration: 1.0,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 87%', once: true }
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.slide-l').forEach((el) => {
				gsap.from(
					el,
					{
						x: -80,
						opacity: 0,
						duration: 1.1,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 86%', once: true }
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.slide-r').forEach((el) => {
				gsap.from(
					el,
					{
						x: 80,
						opacity: 0,
						duration: 1.1,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 86%', once: true }
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.st-inner').forEach((el) => {
				gsap.from(
					el,
					{
						yPercent: 114,
						duration: 1.15,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 92%', once: true }
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.ph-mask').forEach((box) => {
				const img = box.querySelector('img')
				gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 84%', once: true } })
					.fromTo(
						box,
						{ clipPath: 'inset(12% 8% 12% 8% round 18px)' },
						{
							clipPath: 'inset(0% 0% 0% 0% round 18px)',
							duration: 1.25,
							ease: 'power3.out'
						}
					)
					.fromTo(
						img,
						{ scale: 1.22 },
						{ scale: 1, duration: 1.7, ease: 'power2.out' },
						0
					)
			})

			gsap.utils.toArray<HTMLElement>('.orb').forEach((o, i) => {
				const fromX = i % 2 ? 80 : -80
				const rot = i % 2 ? 3 : -3
				gsap.timeline({ scrollTrigger: { trigger: o, start: 'top 82%', once: true } })
					.from(
						o,
						{
							x: fromX,
							rotation: rot,
							opacity: 0,
							scale: 0.9,
							duration: 1.2,
							ease: 'power3.out'
						},
						0
					)
					.from(
						o.querySelector('img'),
						{ scale: 1.28, duration: 1.6, ease: 'power2.out' },
						0
					)
			})

			// Deep cinematic parallax across all section backgrounds
			gsap.utils.toArray<HTMLElement>('.parallax img').forEach((img, i) => {
				const dx = i % 2 ? 8 : -8
				gsap.fromTo(
					img,
					{
						yPercent: -26,
						xPercent: dx,
						scale: 1.2
					},
					{
						yPercent: 26,
						xPercent: -dx,
						scale: 1.02,
						ease: 'none',
						scrollTrigger: {
							trigger: img.closest('.snap') || img.parentElement,
							start: 'top bottom',
							end: 'bottom top',
							scrub: 1.2
						}
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.sd-num-l').forEach((el) => {
				gsap.from(
					el,
					{
						x: -75,
						opacity: 0,
						duration: 1.1,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 88%', once: true }
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.sd-num-r').forEach((el) => {
				gsap.from(
					el,
					{
						x: 75,
						opacity: 0,
						duration: 1.1,
						ease: 'power3.out',
						scrollTrigger: { trigger: el, start: 'top 88%', once: true }
					}
				)
			})

			gsap.from(
				'.t-cell',
				{
					x: -40,
					opacity: 0,
					stagger: 0.08,
					duration: 0.85,
					ease: 'power3.out',
					scrollTrigger: { trigger: '.cd-timer', start: 'top 85%', once: true }
				}
			)

			// Marquee infinite scrubber
			document.querySelectorAll<HTMLElement>('.marquee').forEach((mq) => {
				const track = mq.querySelector<HTMLElement>('.mq-track')
				if (track) {
					const toRight = mq.classList.contains('mq-r')
					gsap.fromTo(
						track,
						{ xPercent: toRight ? -50 : 0 },
						{
							xPercent: toRight ? 0 : -50,
							ease: 'none',
							scrollTrigger: {
								trigger: mq,
								start: 'top bottom',
								end: 'bottom top',
								scrub: 1
							}
						}
					)
				}
			})

			// Horizontal Gallery Pinned Scrub
			const hWrap = document.getElementById('gallery')
			const hTrack = document.getElementById('hTrack')
			const hBar = document.querySelector<HTMLElement>('.h-progress i')
			if (hWrap && hTrack) {
				const hAmount = () => Math.max(0, hTrack.scrollWidth - hWrap.clientWidth)
				gsap.to(hTrack, {
					x: () => -hAmount(),
					ease: 'none',
					scrollTrigger: {
						trigger: hWrap,
						start: 'top top',
						end: () => '+=' + Math.round(hAmount() * 2.2),
						pin: true,
						scrub: 0.9,
						anticipatePin: 1,
						invalidateOnRefresh: true,
						onUpdate: (self) => {
							if (hBar) gsap.set(hBar, { scaleX: self.progress })
						}
					}
				})

				gsap.from(
					'.h-intro > *',
					{
						y: 36,
						opacity: 0,
						stagger: 0.08,
						duration: 0.9,
						ease: 'power3.out',
						scrollTrigger: { trigger: hWrap, start: 'top 70%', once: true }
					}
				)
			}

			// Story photo clip path reveal
			gsap.utils.toArray<HTMLElement>('.story-photo').forEach((box, i) => {
				const right = i % 2 === 1
				const from = right
					? 'inset(0% 0% 0% 100% round 18px)'
					: 'inset(0% 100% 0% 0% round 18px)'
				gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 84%', once: true } })
					.fromTo(
						box,
						{ clipPath: from },
						{
							clipPath: 'inset(0% 0% 0% 0% round 18px)',
							duration: 1.1,
							ease: 'power3.inOut'
						}
					)
					.from(
						box.querySelector('img'),
						{
							scale: 1.25,
							xPercent: right ? 8 : -8,
							duration: 1.5,
							ease: 'power2.out'
						},
						0
					)
			})

			// Navigation link section triggers
			const navSections = [
				{ id: 'home', trigger: '#home', end: '#couple' },
				{ id: 'couple', trigger: '#couple', end: '#event' },
				{ id: 'event', trigger: '#event', end: '#gallery' },
				{ id: 'gallery', trigger: '#gallery', end: '#gift' },
				{ id: 'gift', trigger: '#gift', end: '.closing' }
			]

			navSections.forEach(({ id, trigger, end }) => {
				ScrollTrigger.create({
					trigger,
					start: 'top 55%',
					endTrigger: end,
					end: 'top 55%',
					onToggle: (self) => {
						if (self.isActive) activeSection.value = id
					}
				})
			})

		}, containerRef.value)
	}

	const handleOpenInvitation = () => {
		document.body.classList.remove('lock')
		document.body.classList.add('opened')
		isOpened.value = true

		try {
			startMusic()
		} catch (e) {
			console.warn('Audio start deferred:', e)
		}

		// Hero reveal animation with left & right floating photos and split typography
		gsap.timeline({ defaults: { ease: 'power3.out' } })
			.fromTo(
				'.hero > .parallax img',
				{ scale: 1.35 },
				{ scale: 1, duration: 2.0, ease: 'power2.out' },
				0
			)
			// Floating photos sweep in from left and right
			.fromTo(
				'.h-float-l',
				{ x: -110, opacity: 0, rotation: -16 },
				{ x: 0, opacity: 1, rotation: -6, duration: 1.3, ease: 'back.out(1.2)' },
				0.2
			)
			.fromTo(
				'.h-float-r',
				{ x: 110, opacity: 0, rotation: 16 },
				{ x: 0, opacity: 1, rotation: 6, duration: 1.3, ease: 'back.out(1.2)' },
				0.3
			)
			// Couple names enter from left and right
			.fromTo(
				'.hn-l',
				{ x: -70, opacity: 0 },
				{ x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
				0.4
			)
			.fromTo(
				'.hn-r',
				{ x: 70, opacity: 0 },
				{ x: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
				0.4
			)
			.fromTo(
				'.hn-amp',
				{ scale: 0, opacity: 0 },
				{ scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.8)' },
				0.5
			)
			// Date and line expansion
			.fromTo(
				['.h-line-l', '.h-line-r'],
				{ scaleX: 0 },
				{ scaleX: 1, duration: 0.9, stagger: 0.1 },
				0.6
			)
			.fromTo(
				['.hero-eyebrow', '.hero-date'],
				{ opacity: 0, y: 22 },
				{ opacity: 1, y: 0, stagger: 0.1, duration: 0.9 },
				0.6
			)
			// Left & right quote marks and verse
			.fromTo(
				'.quote-l',
				{ x: -30, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.8 },
				0.8
			)
			.fromTo(
				'.quote-r',
				{ x: 30, opacity: 0 },
				{ x: 0, opacity: 1, duration: 0.8 },
				0.8
			)
			.fromTo(
				['.hero-quote p', '.quote-verse'],
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, stagger: 0.1, duration: 0.9 },
				0.85
			)
			.fromTo(
				'.scroll-hint',
				{ opacity: 0, y: 14 },
				{ opacity: 1, y: 0, duration: 0.8 },
				1.0
			)
			.fromTo(
				['.music-btn', '.bottom-nav'],
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
				1.1
			)

		nextTick(() => {
			ScrollTrigger.refresh()
		})
		setTimeout(() => {
			ScrollTrigger.refresh()
		}, 350)
	}

	onMounted(() => {
		document.body.classList.add('lock')

		nextTick(() => {
			initAnimations()
			ScrollTrigger.refresh()
		})
	})

	onUnmounted(() => {
		document.body.classList.remove('lock', 'opened')
		ctx?.revert()
	})
</script>

<template>
	<div
		ref="containerRef"
		id="app-container"
		class="app-wrapper"
	>
		<!-- Cover Gate / Envelope Curtain -->
		<CoverGate
			:guest-name="guestName"
			@open="handleOpenInvitation"
		/>

		<!-- Main Invitation Sections -->
		<main>
			<HeroSection />

			<SaveTheDate />

			<CoupleSection />

			<CountdownSection />

			<EventsSection />

			<LiveStreaming />

			<RsvpSection />

			<GallerySection />

			<StorySection />

			<GiftSection />

			<!-- Interactive Real-time Chat & Wishes -->
			<ChatWishes :default-name="guestName !== 'Honored Guest' ? guestName : ''" />

			<ClosingSection />
		</main>

		<!-- Bottom Fixed Controls -->
		<BottomNav
			:active-section="activeSection"
			@navigate="navigateTo"
		/>

		<MusicButton />

		<ToastNotification />
	</div>
</template>

<style scoped>
	.app-wrapper {
		position: relative;
		overflow-x: hidden;
		width: 100%;
	}
</style>
