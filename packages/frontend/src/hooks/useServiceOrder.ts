import useSWR from "swr";

import { TServiceOrderWithClient } from "@/types/serviceOrder";

function useServiceOrder(id: string) {
  const { data, error, mutate } = useSWR(`/api/private/serviceOrders/${id}`);

  return {
    serviceOrder: data as TServiceOrderWithClient | undefined,
    isLoading: !error && !data,
    mutate,
    error,
  };
}

export default useServiceOrder;
