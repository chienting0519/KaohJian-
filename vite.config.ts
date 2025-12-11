import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 修正 process 類型問題，並載入環境變數
  const env = loadEnv(mode, process.cwd(), '');

  return {
    // 【關鍵修復】設定根目錄，解決白屏問題
    base: '/',
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false, // 生產環境關閉 sourcemap 節省資源
    }
  };
});