import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// base: "./" -> lauffähig unter jeder Domain und unter GitHub Pages in einem Unterverzeichnis
export default defineConfig({
  base: "./",
  server: { host: "::", port: 8080 },
  plugins: [react()],
  json: { stringify: true },
  build: { outDir: "dist", sourcemap: false, chunkSizeWarningLimit: 1500 },
});
