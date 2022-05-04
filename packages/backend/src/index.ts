import "dotenv/config";

import server from "./app";

// Constants
const port = process.env.PORT || 1234;
console.log(`Server listening on port ${port}`);

// Start server
server.listen(port);
