import useSWR from "swr";

import ServiceOrder from "@/types/serviceOrder";

export default function useServiceOrders() {
  const { data, error, mutate } = useSWR(`/api/private/serviceOrders`);

  return {
    serviceOrders: data as ServiceOrder[] | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
