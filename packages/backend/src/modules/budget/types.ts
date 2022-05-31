import { Budget as B, BudgetItem } from "@prisma/client";

interface Budget extends B {
  itens: BudgetItem[];
}

interface ProcessedBudget extends Budget {
  total: number;
}

export type { Budget, ProcessedBudget };
