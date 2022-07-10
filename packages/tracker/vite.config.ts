import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  envPrefix: ["A", "S"], // This is only for testing, so all env variables can be exposed
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./config"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
