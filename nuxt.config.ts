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
				{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				{ rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
				{
					rel: 'stylesheet',
					href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Italianno&family=Jost:wght@200;300;400;500&display=swap'
				}
			]
		}
	},
	runtimeConfig: {
		public: {
			supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || '',
			supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY || ''
		}
	}
})
