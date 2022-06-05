import { TBudgetItem, TBudgetItemInput } from "@/types/budgetItem";

import request from "../request";

export default async (id: number, item: TBudgetItemInput) => {
  const { response, status, error } = await request({
    method: "PUT",
    url: "/api/private/budgetItem",
    body: { id, ...item },
  });

  const updatedBudgetItem = response as TBudgetItem;

  return { updatedBudgetItem, status, error };
};
