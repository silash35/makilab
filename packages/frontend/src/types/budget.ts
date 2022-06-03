interface BudgetItem {
  id: number;
  createdAt: Date;
  budgetId: number;

  name: string;
  price: number;
  quantity: number;
}

interface TBudget {
  id: number;
  createdAt: Date;
  name: string;
  serviceOrderId: number;

  itens: BudgetItem[];
  total: number;
}

interface TBudgetInput {
  name: string;
}

export type { TBudget, TBudgetInput };
export default TBudget;
