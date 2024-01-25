import "dotenv/config";

import server from "./app";

const port = process.env.PORT;
console.log(`Server listening on port ${port}`);

// VItest does not need the server to listen on a port
if (process.env.VITEST !== "true") {
  server.listen(port);
}

export const viteNodeApp = server;
