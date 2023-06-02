import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import { svgBuilder } from './src/icon';

export default defineConfig({
	optimizeDeps: {
		
	},
	plugins: [
		vue(),
		svgBuilder('./src/assets/svg/'),
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
