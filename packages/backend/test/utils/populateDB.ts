import { createClient } from "@test/utils/client";

import { generateClient, generateServiceOrder } from "./generators";

const populateDB = async (n: number) => {
  for (let i = 0; i < n; i++) {
    const { clientId, serviceOrderId } = await createClient(
      generateClient(),
      generateServiceOrder(),
    );
    console.log("created client", clientId, "with service order", serviceOrderId);
  }
  console.log(`Finished creating ${n} clients.`);
};

export default populateDB;
