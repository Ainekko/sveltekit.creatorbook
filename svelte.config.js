// svelte.config.js - Updated for Vercel
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// Vercel-specific options
			runtime: 'nodejs20.x',
			regions: ['iad1'], // Change to your preferred region
			split: false // Set to true for route splitting if needed
		})
	},
	preprocess: vitePreprocess()
};

export default config;