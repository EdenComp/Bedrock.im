import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import inject from '@rollup/plugin-inject'
import {nodePolyfills} from "vite-plugin-node-polyfills";

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [
        inject({
          "globalThis.Buffer": ["buffer", "Buffer"],
        }),
      ],
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      include: ["buffer"],
      globals: {
        Buffer: true,
      },
    }),
  ],
})
