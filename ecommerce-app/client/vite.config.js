import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    host: true,
    proxy: {
      "/api": {
        target: "https://amazon-backend-production-d0c3.up.railway.app",
        changeOrigin: true,
      },
    },
  },
});
