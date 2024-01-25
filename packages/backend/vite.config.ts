import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
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
    hookTimeout: 60 * 1000, // 60 seconds
    fileParallelism: false,
    globalSetup: ["./test/setup.ts"],
  },
});
