interface TBudgetItemInput {
  name: string;
  price: number;
  quantity: number;
}

interface TBudgetItem {
  id: number;
  createdAt: Date;
  budgetId: number;

  name: string;
  price: number;
  quantity: number;
}

export type { TBudgetItem, TBudgetItemInput };
export default TBudgetItem;
