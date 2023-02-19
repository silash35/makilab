import useSWR from "swr";

import { TServiceOrderWithClient } from "@/types/serviceOrder";

function useServiceOrders(query = "") {
  const { data, error, mutate } = useSWR(`/api/private/serviceOrders${query}`);

  return {
    serviceOrders: data as TServiceOrderWithClient[] | undefined,
    isLoading: !error && !data,
    mutate,
    error,
  };
}

export default useServiceOrders;
