import useSWR from "swr";

import { TServiceOrderWithClient } from "@/types/serviceOrder";

export default function useServiceOrders() {
  const { data, error, mutate } = useSWR(`/api/private/serviceOrders`);

  return {
    serviceOrders: data as TServiceOrderWithClient[] | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
