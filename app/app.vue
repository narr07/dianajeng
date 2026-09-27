<script setup lang="ts">
	import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
	import { useGSAP } from '~/composables/useGSAP'
	import { useAudio } from '~/composables/useAudio'
	import Lenis from 'lenis'
	import 'lenis/dist/lenis.css'

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
	let lenis: Lenis | null = null

	// Locomotive-style smooth scroll: Lenis eases the native scroll and is
	// driven by GSAP's ticker so ScrollTrigger reads the same frame.
	const onTick = (time: number) => lenis?.raf(time * 1000)

	const initSmoothScroll = () => {
		lenis = new Lenis({
			duration: 1.3,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true,
			wheelMultiplier: 0.9,
			touchMultiplier: 1.4
		})
		lenis.on('scroll', ScrollTrigger.update)
		gsap.ticker.add(onTick)
		gsap.ticker.lagSmoothing(0)
		// stay still while the cover is up
		lenis.stop()
	}

	const navigateTo = (targetSelector: string) => {
		const targetEl = document.querySelector(targetSelector)
		if (!targetEl) return
		if (lenis) {
			lenis.scrollTo(targetEl as HTMLElement, { duration: 1.6 })
		} else {
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

			// Stacked photo cards: the section pins and each new card slides up
			// over the last, which sinks back, shrinks and dims into the pile
			const sg = document.getElementById('stack-gallery')
			const sgCards = gsap.utils.toArray<HTMLElement>('#stack-gallery .sg-card')
			if (sg && sgCards.length > 1) {
				// explicit starting filter: tweening from `none` makes GSAP start
				// brightness at 0, which flashes the cards black mid-scroll
				gsap.set(sgCards, { filter: 'brightness(1)' })
				gsap.set(sgCards.slice(1), { yPercent: 120, rotation: (i) => (i % 2 ? -5 : 5) })
				const sgTl = gsap.timeline({
					defaults: { ease: 'power2.inOut' },
					scrollTrigger: {
						trigger: sg,
						start: 'top top',
						end: () => '+=' + window.innerHeight * 0.8 * (sgCards.length - 1),
						pin: true,
						scrub: 0.8,
						anticipatePin: 1,
						invalidateOnRefresh: true
					}
				})
				sgCards.slice(1).forEach((card, i) => {
					const step = i + 1
					sgTl.to(card, { yPercent: 0, rotation: 0, duration: 1 }, i)
					// every card already in the pile steps back one more level
					sgCards.slice(0, step).forEach((under, j) => {
						const depth = step - j
						sgTl.to(
							under,
							{
								scale: 1 - depth * 0.05,
								y: -depth * 16,
								filter: `brightness(${Math.max(0.7, 1 - depth * 0.1)})`,
								duration: 1
							},
							i
						)
					})
				})
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

			// Layered depth scenes: each [data-parallax-speed] layer inside a
			// [data-parallax] section drifts at its own rate (1 = with the page)
			gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
				gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((scene) => {
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: scene,
							start: 'clamp(top bottom)',
							end: 'clamp(bottom top)',
							scrub: true
						}
					})
					scene.querySelectorAll<HTMLElement>('[data-parallax-speed]').forEach((layer) => {
						const shift = (1 - parseFloat(layer.dataset.parallaxSpeed || '1')) * 50
						tl.fromTo(layer, { yPercent: -shift }, { yPercent: shift, ease: 'none' }, 0)
					})
				})
			})

			// Read-along text: each word lights up gold as it is scrolled past,
			// then settles to cream. Reduced motion keeps the words fully readable.
			// With data-read-along-pin the section locks with its bottom on the
			// screen's bottom until every word has been read, then scrolling resumes.
			gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
				const els = gsap.utils.toArray<HTMLElement>('[data-read-along]')
				els.forEach((el) => {
					el.classList.add('is-live')
					const words = el.querySelectorAll('.word')
					const scene = el.hasAttribute('data-read-along-pin') ? el.closest('section') : null
					const tl = gsap.timeline({
						scrollTrigger: scene
							? {
									trigger: scene,
									start: 'bottom bottom',
									end: () => '+=' + Math.max(900, words.length * 45),
									pin: true,
									scrub: 0.6,
									anticipatePin: 1,
									invalidateOnRefresh: true,
									// created before triggers above it; measure first so
									// everything below accounts for the pin spacing
									refreshPriority: 1
								}
							: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true }
					})
					// unread words wait low, blurred and faint; each one rises into place
					// lit in gold, then settles to cream
					gsap.set(words, { yPercent: 60, opacity: 0.12, filter: 'blur(6px)' })
					words.forEach((w, i) => {
						tl.to(
							w,
							{ yPercent: 0, opacity: 1, filter: 'blur(0px)', color: '#E3C08D', duration: 0.5, ease: 'power2.out' },
							i * 0.5
						).to(w, { color: '#EDE7DC', duration: 0.6 }, i * 0.5 + 0.5)
					})
				})
				return () => els.forEach((el) => el.classList.remove('is-live'))
			})

			// Locomotive-style parallax: data-speed="0.2" drifts against the scroll
			gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
				const speed = parseFloat(el.dataset.speed || '0')
				gsap.fromTo(
					el,
					{ y: () => -speed * window.innerHeight * 0.5 },
					{
						y: () => speed * window.innerHeight * 0.5,
						ease: 'none',
						scrollTrigger: {
							trigger: el.closest('section') || el,
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
							invalidateOnRefresh: true
						}
					}
				)
			})

			// Video section: video eases out of a zoom while the section scrolls in,
			// then the text rises out of line masks
			const hv = document.getElementById('home-video')
			if (hv) {
				gsap.fromTo(
					hv.querySelector('video'),
					{ scale: 1.25 },
					{
						scale: 1,
						ease: 'none',
						// finish zooming exactly when the section pins
						scrollTrigger: { trigger: hv, start: 'top bottom', end: 'bottom bottom', scrub: true }
					}
				)
				gsap.timeline({ scrollTrigger: { trigger: hv, start: 'top 60%', once: true } })
					.from(hv.querySelectorAll('.hv-mask-in'), {
						yPercent: 110,
						duration: 1.3,
						stagger: 0.12,
						ease: 'expo.out'
					})
					.from(
						hv.querySelectorAll('.hv-line'),
						{ scaleX: 0, duration: 1.1, ease: 'expo.out' },
						0.35
					)
				gsap.from(hv.querySelector('.hv-verse'), {
					y: 16,
					opacity: 0,
					duration: 1.1,
					ease: 'power3.out',
					scrollTrigger: { trigger: hv.querySelector('.hv-verse'), start: 'top 92%', once: true }
				})
			}

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
		lenis?.start()

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

		initSmoothScroll()

		nextTick(() => {
			initAnimations()
			// triggers are created per effect, not in page order; sort them top to
			// bottom so everything below a pinned section accounts for its spacing
			ScrollTrigger.sort()
			ScrollTrigger.refresh()
		})
	})

	onUnmounted(() => {
		document.body.classList.remove('lock', 'opened')
		ctx?.revert()
		gsap.ticker.remove(onTick)
		lenis?.destroy()
		lenis = null
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

			<HeroVideoSection />

			<SaveTheDate />

			<CoupleSection />

			<CountdownSection />

			<EventsSection />

			<LiveStreaming />

			<RsvpSection />

			<GallerySection />

			<StackGallery />

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
