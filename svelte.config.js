import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations#preprocessors for more info.
	preprocess: vitePreprocess(),

	compilerOptions: {
		// Force runes mode project-wide, except for libraries inside node_modules.
		// Mirrors the setting in vite.config.ts so the package build (svelte-package)
		// compiles these components in runes mode. Can be removed in Svelte 6.
		runes: ({ filename }) =>
			filename.split(/[/\\]/).includes("node_modules") ? undefined : true
	},

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;