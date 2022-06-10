import { Client as C } from "@prisma/client";

import { ProcessedSO, ServiceOrder } from "../serviceOrder/types";

interface Client extends C {
  serviceOrders?: ServiceOrder[];
}

interface ProcessedClient extends C {
  serviceOrders?: ProcessedSO[];
}

export type { Client, ProcessedClient };
