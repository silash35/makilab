import { ServiceOrder as S } from "@prisma/client";

import { Client, ProcessedClient } from "../client/types";

interface ServiceOrder extends S {
  owner?: Client;
}

interface ProcessedSO extends ServiceOrder {
  statusNumber: Situation;
  defaultEmail?: string;
  statusName: string;
  isUrgent: boolean;

  owner?: ProcessedClient;
}

enum Situation {
  WAITING_OSF,
  WAITING_BUDGET,
  WAITING_APPROVAL,
  WAITING_PARTS,
  BUDGET_REJECTED,
  WAITING_REPAIR,
  WAITING_RETRIEVAL,
  FINALIZED,
}

export { Situation };
export type { ProcessedSO, ServiceOrder };
