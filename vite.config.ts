import reactRefresh from '@vitejs/plugin-react-refresh'; // react 热更新
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    reactRefresh(),
  ],
  
})
