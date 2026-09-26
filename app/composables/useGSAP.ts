import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

export const useGSAP = () => {
	if (import.meta.client) {
		gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)
	}

	return {
		gsap,
		ScrollTrigger,
		ScrollToPlugin
	}
}
