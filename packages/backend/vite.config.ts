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
  test: {
    globals: true,
    testTimeout: 60 * 1000, // 60 seconds
    hookTimeout: 2 * 60 * 1000, // 2 minutes
  },
});
