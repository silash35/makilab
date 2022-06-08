import useSWR from "swr";

import TBudget from "@/types/budget";

export default function useBudget(id: string) {
  const { data, error, mutate } = useSWR(`/api/private/budget/${id}`);

  return {
    budget: data as TBudget | undefined,
    isLoading: !error && !data,
    mutate,
    error,
  };
}
