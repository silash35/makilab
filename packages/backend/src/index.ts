import server from "./app";

const port = import.meta.env.PORT || 1234;
console.log(`Server listening on port ${port}`);

// Start server
if (import.meta.env.PROD) {
  server.listen(port);
}

export const viteNodeApp = server;
