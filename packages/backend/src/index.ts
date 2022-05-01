import "dotenv/config";

import server from "./server";

// Constants
const port = process.env.PORT || 3000;
console.log(`Server listening on port ${port}`);

// Start server
server.listen(port);
