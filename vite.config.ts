import { defineConfig } from "vitest/config"; // ✅ use vitest/config, not vite
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  test: {
    globals: true, // allows describe, it, expect globally
    environment: "jsdom", // needed for DOM testing
    setupFiles: "./src/vitest.setup.ts",
  },
});
