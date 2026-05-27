/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				mono: ['"JetBrains Mono"', 'ui-monospace', 'Menlo', 'Consolas', 'monospace'],
				display: ['"Doto"', 'monospace'],
			},
			colors: {
				accent: 'var(--accent)',
				'accent-2': 'var(--accent-2)',
				muted: 'var(--muted)',
				'site-border': 'var(--border)',
				'site-surface': 'var(--surface)',
			},
		},
	},
	plugins: [],
};
