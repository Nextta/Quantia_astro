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

  integrations: [react(), clerk({
    signInUrl: "/login/LoginPage",
    signUpUrl: "/sign_up/SignUp",
    signInForceRedirectUrl: "/main/Home",
    signUpForceRedirectUrl: "/main/Home",
    afterSignOutUrl: "/login/LoginPage",
    appearance: {
      variables: {
        colorPrimary: "#7bd0ff",
        colorBackground: "#131b2e",
        colorForeground: "#dae2fd",
        colorInput: "#060e20",
        colorInputForeground: "#dae2fd",
        colorSuccess: "#4edea3",
        borderRadius: "0.5rem",
        fontFamily: "Inter, sans-serif",
      },
      elements: {
        card: { background: "#131b2e", boxShadow: "none" },
        formButtonPrimary: {
          background: "#7bd0ff",
          color: "#00354a",
          fontWeight: 700,
        },
        socialButtonsBlockButton: {
          background: "#222a3d",
          color: "#dae2fd",
          borderColor: "#2d3449",
        },
      },
    },
  }),
],
});
