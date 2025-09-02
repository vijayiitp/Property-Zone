import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: "dist",
  },
  // This ensures frontend routing works on refresh in dev
  preview: {
    port: 4173,
    strictPort: true,
  }
});
