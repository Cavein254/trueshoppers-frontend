// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    react({
      // Transpile-only mode (no type checking at build)
      babel: {
        plugins: [],
      },
    }),
    tsconfigPaths(),
  ],
  esbuild: {
    loader: 'tsx',
    tsconfigRaw: '{}',
  },
  preview: {
    allowedHosts: [
      "trueshoppers-frontend.onrender.com", // 👈 add your Render domain here
    ],
     host: true, // allows external connections
  },
})
