import TBudgetItem from "./budgetItem";

interface TBudget {
  id: number;
  createdAt: Date;
  name: string;
  serviceOrderId: number;

  itens: TBudgetItem[];
  total: number;
}

interface TBudgetInput {
  name: string;
}

export type { TBudget, TBudgetInput };
export default TBudget;
