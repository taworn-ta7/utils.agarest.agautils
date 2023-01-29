import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: async () => await import('@/components/HomePage.vue'),
		},
		{
			path: '/weapon',
			name: 'weapon',
			component: async () => await import('@/components/WeaponPage.vue'),
		},
		{
			path: '/skill',
			name: 'skill',
			component: async () => await import('@/components/SkillPage.vue'),
		},
	],
})

export default router;
