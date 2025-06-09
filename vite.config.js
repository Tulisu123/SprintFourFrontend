import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
	root: 'src',
	plugins: [react()],
	build: {
		// outDir: '../backend/public',
		emptyOutDir: true,
	},
	css: {
		devSourcemap: true
	}
})
