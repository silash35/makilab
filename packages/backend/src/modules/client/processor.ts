import processSO from "../serviceOrder/processor";
import type { Client, ProcessedClient } from "./types";

const processClient = (client?: Client | Client[] | null) => {
  const process = (c: Client): ProcessedClient => {
    const serviceOrders = processSO(c.serviceOrders);

    if (!Array.isArray(serviceOrders) && serviceOrders !== undefined) {
      throw new Error("serviceOrders needs to be an array");
    }

    const processedClient: ProcessedClient = {
      ...c,
      serviceOrders,
    };

    return processedClient;
  };

  if (!client) {
    return undefined;
  }

  if (Array.isArray(client)) {
    return client.map((c) => process(c));
  }

  return process(client);
};

export default processClient;
