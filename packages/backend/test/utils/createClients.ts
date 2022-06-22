import { createClient } from "@test/utils/client";

import { generateClient, generateServiceOrder } from "./generators";

const createClients = async (n: number) => {
  for (let i = 0; i < n; i++) {
    await createClient(generateClient(), generateServiceOrder());
    console.log(`Created ${i + 1} clients`);
  }
};

export default createClients;
