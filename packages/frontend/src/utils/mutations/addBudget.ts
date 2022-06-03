import { TBudget, TBudgetInput } from "@/types/budget";

import request from "../request";

export default async (serviceOrderId: number, newBudget?: TBudgetInput) => {
  const { response, status, error } = await request({
    method: "POST",
    url: "/api/private/budget",
    body: { serviceOrderId, budget: newBudget },
  });

  const budget = response as TBudget;

  return { budget, status, error };
};
