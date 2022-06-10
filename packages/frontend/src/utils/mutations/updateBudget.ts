import { TBudget, TBudgetInput } from "@/types/budget";

import request from "../request";

export default async (id: number, budget: TBudgetInput) => {
  const { response, status, error } = await request({
    method: "PUT",
    url: "/api/private/budget",
    body: { id, ...budget },
  });

  const updatedBudget = response as TBudget;

  return { updatedBudget, status, error };
};
