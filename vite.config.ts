import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import makeManifest from "./utils/plugins/make-manifest";

const root = resolve(__dirname, "src");
const pagesDir = resolve(root, "pages");
const assetsDir = resolve(root, "assets");
const outDir = resolve(__dirname, "dist");
const publicDir = resolve(__dirname, "public");

export default defineConfig({
  resolve: {
    alias: {
      "@src": root,
      "@assets": assetsDir,
      "@pages": pagesDir,
    },
  },
  plugins: [react(), makeManifest()],
  publicDir,
  build: {
    outDir,
    rollupOptions: {
      input: {
        popup: resolve(pagesDir, "popup", "index.html"),
        content: resolve(pagesDir, "content", "rbc.ts")
      },
      output: {
        entryFileNames: (chunk) => {
          return `src/pages/${chunk.name}/index.js`;
        },
      },
    },
  },
});
