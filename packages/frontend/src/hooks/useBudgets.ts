import useSWR from "swr";

import TBudget from "@/types/budget";

function useBudgets(serviceOrderId: string) {
  const { data, error, mutate } = useSWR(`/api/private/budget/serviceOrder/${serviceOrderId}`);

  return {
    budgets: data as TBudget[] | undefined,
    isLoading: !error && !data,
    mutate,
    error,
  };
}

export default useBudgets;
