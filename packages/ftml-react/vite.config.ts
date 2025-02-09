import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import deno from "@deno/vite-plugin";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), deno(),wasm(),topLevelAwait()],
  build: {
    target: 'esnext' //browsers can handle the latest ES features
  }
})
