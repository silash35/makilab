import type { Budget, ProcessedBudget } from "./types";

const processBudget = (budget?: Budget | Budget[] | null) => {
  const process = (b: Budget): ProcessedBudget => {
    const total = b.itens.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const processedBudget: ProcessedBudget = {
      ...b,
      total,
    };

    return processedBudget;
  };

  if (!budget) {
    return undefined;
  }

  if (Array.isArray(budget)) {
    return budget.map((b) => process(b));
  }

  return process(budget);
};

export default processBudget;
