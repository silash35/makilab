import { TBudgetItem, TBudgetItemInput } from "@/types/budgetItem";

import request from "../request";

export default async (budgetId: number, newBudgetItem: TBudgetItemInput) => {
  const { response, status, error } = await request({
    method: "POST",
    url: "/api/private/budgetItem",
    body: { budgetId, budgetItem: newBudgetItem },
  });

  const budgetItem = response as TBudgetItem;

  return { budgetItem, status, error };
};
