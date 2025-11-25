import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'), // 這裡對應你的根目錄結構
    },
  },
  // Vercel 不需要手動設定 server port，也不需要 define process.env
});
