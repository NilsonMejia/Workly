import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: "frontend",
  plugins: [vue()],
  build: {
    outDir: "dist",
    emptyOutDir: true
  },
  server: {
    port: 5173,
    proxy: {
      "/api": "http://localhost:3000",
      "/auth": "http://localhost:3000",
      "/catalogos": "http://localhost:3000",
      "/users": "http://localhost:3000",
      "/empresas": "http://localhost:3000",
      "/vacantes": "http://localhost:3000",
      "/postulaciones": "http://localhost:3000",
      "/perfil": "http://localhost:3000",
      "/dashboard": "http://localhost:3000",
      "/admin": "http://localhost:3000",
      "/admin-auth": "http://localhost:3000",
      "/notificaciones": "http://localhost:3000",
      "/valoraciones": "http://localhost:3000",
      "/guardados": "http://localhost:3000",
      "/empresa": "http://localhost:3000",
      "/usuario": "http://localhost:3000"
    }
  }
});
