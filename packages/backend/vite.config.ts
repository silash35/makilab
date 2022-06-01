import path from "path";
import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

export default defineConfig({
  envPrefix: ["D", "E", "J", "P", "S"], // It is a backend server, so all env variables can be exposed
  server: {
    port: 1234,
  },
  plugins: [
    ...VitePluginNode({
      adapter: "express",
      appPath: "./src/index.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./config"),
      "@test": path.resolve(__dirname, "./test"),
    },
  },
  test: {
    globals: true,
    testTimeout: 60 * 1000, // 60 seconds
    hookTimeout: 2 * 60 * 1000, // 2 minutes
  },
});
