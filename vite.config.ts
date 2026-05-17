import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({
      // Include all .svg files for ?react import
      include: "**/*.svg?react",
    }),
  ],
  build: {
    target: "es2020",
  },
});
