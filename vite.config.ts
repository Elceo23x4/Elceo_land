import { defineConfig } from "vite";

export default defineConfig({
  // Vanilla JS build — no React plugin needed
  // SVGs imported as ?raw strings and injected as innerHTML
  // This keeps all SVGs as inline DOM SVGs for Batch 2 animation targeting
  build: {
    target: "es2020",
  },
});
