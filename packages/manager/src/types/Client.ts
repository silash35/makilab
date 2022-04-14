import { Client as C, ServiceOrder } from "@prisma/client";

interface Client extends C {
  serviceOrders: ServiceOrder[];
}

export type { Client };
