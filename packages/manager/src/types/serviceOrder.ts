import { Client, ServiceOrder } from "@prisma/client";

interface SO extends ServiceOrder {
  owner?: Client;
}

interface ProcessedOwner extends Client {
  defaultEmail?: string;
}

interface ProcessedSO extends ServiceOrder {
  statusNumber: 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70;
  statusName: string;
  isUrgent: boolean;

  owner?: ProcessedOwner;
}

export type { ProcessedOwner, ProcessedSO, SO as ServiceOrder };
