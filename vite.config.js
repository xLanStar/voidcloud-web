import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import { svgBuilder } from './src/icon';

export default defineConfig({
	optimizeDeps: {

	},
	plugins: [
		vue(),
		svgBuilder('./src/assets/svg/'),
		electron({
			entry: 'electron/main.js',
		}),
	],
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "src/assets/scss/global";`,
			}
		}
	},
	build: {
		target: 'esnext'
	},
})
