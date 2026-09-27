// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	css: ['~/assets/css/main.css'],
	app: {
		head: {
			title: 'Dian & Ajeng — Wedding Invitation',
			htmlAttrs: {
				lang: 'en'
			},
			meta: [
				{ charset: 'UTF-8' },
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover'
				},
				{
					name: 'theme-color',
					content: '#0b0a0c'
				},
				{
					name: 'description',
					content: 'The Wedding of Dian Hidayat & Ajeng Fauziah — Sunday, 6 December 2026'
				}
			],
			link: [
				{ rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
				{ rel: 'icon', type: 'image/png', href: '/favicon-32.png', sizes: '32x32' },
				{ rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
				{ rel: 'manifest', href: '/site.webmanifest' },
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@1,400;1,500&family=Jost:wght@200;300;400;500&display=swap'
				}
			]
		}
	},
	runtimeConfig: {
		public: {
			// Accept our own names as well as the ones the Vercel ↔ Supabase
			// integration creates (with or without its custom prefix). Only the
			// public anon key belongs here — never the service role key.
			supabaseUrl:
				process.env.NUXT_PUBLIC_SUPABASE_URL ||
				process.env.STORAGE_SUPABASE_URL ||
				process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL ||
				process.env.SUPABASE_URL ||
				process.env.NEXT_PUBLIC_SUPABASE_URL ||
				'',
			supabaseKey:
				process.env.NUXT_PUBLIC_SUPABASE_KEY ||
				process.env.STORAGE_SUPABASE_ANON_KEY ||
				process.env.NEXT_PUBLIC_STORAGE_SUPABASE_ANON_KEY ||
				process.env.SUPABASE_ANON_KEY ||
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
				process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
				''
		}
	}
})
