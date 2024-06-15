import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  // モードに応じて対応する環境変数をロードする
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: env.VITE_BASE_URL || '/',
  };
});