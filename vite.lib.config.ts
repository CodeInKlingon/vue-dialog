import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [vue()],
	publicDir: false,
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'VueDialog',
			formats: ['es', 'cjs'],
			fileName: (format) => `vue-dialog.${format === 'es' ? 'mjs' : 'cjs'}`,
		},
		rollupOptions: {
			external: ['vue', 'vue-component-type-helpers'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
});
