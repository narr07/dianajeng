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
	// Guest name from the link. Accepts the bare form `/?Dinar Permadi`
	// (also `?Dinar+Permadi` / `?Dinar%20Permadi`) as well as `?to=`, `?name=`
	// or `?guest=`. Parameters that carry a value (utm_*, fbclid…) are ignored
	// in the bare form, since a name is written as a key with no value.
	const guestName = computed(() => {
		const q = route.query
		const first = (v: unknown) => (Array.isArray(v) ? v[0] : v) as string | null | undefined
		let raw = first(q.to) || first(q.name) || first(q.guest) || ''
		if (!raw) {
			raw = Object.keys(q).find((k) => {
				const v = first(q[k])
				return v === null || v === undefined || v === ''
			}) || ''
		}
		const cleaned = raw.replace(/\+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60)
		return cleaned || 'Honored Guest'
	})

	// Link previews (WhatsApp, Instagram, Facebook, X). Crawlers need an absolute
	// image URL, so build it from the request's own origin.
	const requestUrl = useRequestURL()
	const ogImage = `${requestUrl.origin}/og.jpg`
	const ogDescription = computed(() =>
		guestName.value !== 'Honored Guest'
			? `Dear ${guestName.value}, you are warmly invited to our wedding — Sunday, 6 December 2026 · Majalengka, West Java.`
			: 'You are warmly invited to our wedding — Sunday, 6 December 2026 · Majalengka, West Java.'
	)
	useSeoMeta({
		title: 'The Wedding of Dian & Ajeng',
		description: ogDescription,
		ogType: 'website',
		ogSiteName: 'Dian & Ajeng',
		ogTitle: 'The Wedding of Dian & Ajeng',
		ogDescription,
		ogUrl: requestUrl.href,
		ogImage,
		ogImageWidth: 1200,
		ogImageHeight: 630,
		ogImageType: 'image/jpeg',
		ogImageAlt: 'Dian & Ajeng — 06 · 12 · 2026, Majalengka',
		twitterCard: 'summary_large_image',
		twitterTitle: 'The Wedding of Dian & Ajeng',
		twitterDescription: ogDescription,
		twitterImage: ogImage
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

	// Hold the page still (wheel, touch, keys, including iOS momentum) while a
	// section plays something the guest should see before moving on.
	let navigating = false
	const blockScroll = (e: Event) => e.preventDefault()
	const blockKeys = (e: KeyboardEvent) => {
		if ([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) e.preventDefault()
	}
	const holdScroll = (y: number) => {
		lenis?.scrollTo(y, { immediate: true, force: true })
		window.scrollTo(0, y)
		lenis?.stop()
		window.addEventListener('wheel', blockScroll, { passive: false })
		window.addEventListener('touchmove', blockScroll, { passive: false })
		window.addEventListener('keydown', blockKeys)
	}
	const releaseScroll = () => {
		window.removeEventListener('wheel', blockScroll)
		window.removeEventListener('touchmove', blockScroll)
		window.removeEventListener('keydown', blockKeys)
		lenis?.start()
	}

	const navigateTo = (targetSelector: string) => {
		const targetEl = document.querySelector(targetSelector)
		if (!targetEl) return
		if (lenis) {
			// menu jumps pass straight through any held sections
			navigating = true
			lenis.scrollTo(targetEl as HTMLElement, {
				duration: 1.6,
				onComplete: () => {
					navigating = false
				}
			})
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
						scrollTrigger: { trigger: el, start: 'top 87%', toggleActions: 'play none none reverse' }
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
						scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' }
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
						scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: 'play none none reverse' }
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
						scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }
					}
				)
			})

			gsap.utils.toArray<HTMLElement>('.ph-mask').forEach((box) => {
				const img = box.querySelector('img')
				gsap.timeline({ scrollTrigger: { trigger: box, start: 'top 84%', toggleActions: 'play none none reverse' } })
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
				gsap.timeline({ scrollTrigger: { trigger: o, start: 'top 82%', toggleActions: 'play none none reverse' } })
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

			// Sideways parallax on the photo backgrounds: the photo slides left to
			// right as the section passes, alternating direction per section
			gsap.utils.toArray<HTMLElement>('.parallax img').forEach((img, i) => {
				const dir = i % 2 ? -1 : 1
				gsap.fromTo(
					img,
					{ xPercent: -5 * dir },
					{
						xPercent: 5 * dir,
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

			// Save the Date: every line glides in from the right, one after another,
			// and glides back out the same way when scrolling up
			const sdSection = document.querySelector<HTMLElement>('.save-date')
			if (sdSection) {
				gsap.from(sdSection.querySelectorAll('.sd-in'), {
					x: 110,
					opacity: 0,
					duration: 1.1,
					stagger: 0.12,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: sdSection.querySelector('.sd-content-grid'),
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					}
				})
			}

			gsap.from(
				'.t-cell',
				{
					x: -40,
					opacity: 0,
					stagger: 0.08,
					duration: 0.85,
					ease: 'power3.out',
					scrollTrigger: { trigger: '.cd-timer', start: 'top 85%', toggleActions: 'play none none reverse' }
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

			// Read-along text: unread words wait low, blurred and faint; each one
			// rises into place lit in gold, then settles to cream. Reduced motion
			// keeps the words fully readable.
			//
			// With data-read-along-pin the verse plays by itself once its section
			// fills the screen, and the page is held still until the last word is in.
			// (Scroll-scrubbing it failed on iPhone: a single momentum flick shot
			// past the whole pinned distance.)
			gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
				const els = gsap.utils.toArray<HTMLElement>('[data-read-along]')
				els.forEach((el) => {
					el.classList.add('is-live')
					const words = el.querySelectorAll('.word')
					gsap.set(words, { yPercent: 60, opacity: 0.12, filter: 'blur(6px)' })
					const scene = el.hasAttribute('data-read-along-pin') ? el.closest('section') : null

					if (scene) {
						const tl = gsap.timeline({ paused: true, onComplete: releaseScroll })
						words.forEach((w, i) => {
							tl.to(
								w,
								{ yPercent: 0, opacity: 1, filter: 'blur(0px)', color: '#E3C08D', duration: 0.5, ease: 'power2.out' },
								i * 0.12
							).to(w, { color: '#EDE7DC', duration: 0.5 }, i * 0.12 + 0.45)
						})
						ScrollTrigger.create({
							trigger: scene,
							start: 'bottom bottom',
							onEnter: (self) => {
								if (tl.progress() > 0) return
								if (navigating) {
									tl.progress(1)
									return
								}
								// 1px past the start so the trigger counts as active and
								// scrolling back up fires onLeaveBack
								holdScroll(self.start + 1)
								tl.play(0)
							},
							// scrolled back above it: hide the words so it plays again
							onLeaveBack: () => {
								tl.pause(0)
							}
						})
						return
					}

					const tl = gsap.timeline({
						scrollTrigger: { trigger: el, start: 'top 85%', end: 'bottom 50%', scrub: true }
					})
					words.forEach((w, i) => {
						tl.to(
							w,
							{ yPercent: 0, opacity: 1, filter: 'blur(0px)', color: '#E3C08D', duration: 0.5, ease: 'power2.out' },
							i * 0.5
						).to(w, { color: '#EDE7DC', duration: 0.6 }, i * 0.5 + 0.5)
					})
				})
				return () => {
					releaseScroll()
					els.forEach((el) => el.classList.remove('is-live'))
				}
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
				gsap.timeline({ scrollTrigger: { trigger: hv, start: 'top 60%', toggleActions: 'play none none reverse' } })
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
					scrollTrigger: { trigger: hv.querySelector('.hv-verse'), start: 'top 92%', toggleActions: 'play none none reverse' }
				})
			}

			// Navigation link section triggers
			const navSections = [
				{ id: 'home', trigger: '#home', end: '#couple' },
				{ id: 'couple', trigger: '#couple', end: '#event' },
				{ id: 'event', trigger: '#event', end: '#wishes-section' },
				{ id: 'wishes', trigger: '#wishes-section', end: '.closing' }
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

		// Hero reveal animation with split typography
		gsap.timeline({ defaults: { ease: 'power3.out' } })
			.fromTo(
				'.hero > .parallax img',
				{ scale: 1.35 },
				{ scale: 1, duration: 2.0, ease: 'power2.out' },
				0
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
		releaseScroll()
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
		<!-- Loading splash, lifts once photos and fonts are in -->
		<SplashScreen />

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
