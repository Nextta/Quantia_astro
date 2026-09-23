// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";
import react from "@astrojs/react";
import clerk from "@clerk/astro";

export default defineConfig({
  output: "server",

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "@tauri-apps/api/window",
        "lightweight-charts",
      ],
    },
  },

  adapter: node({
    mode: "standalone",
  }),

  integrations: [react(), clerk()],
});