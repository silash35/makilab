import useSWR from "swr";

import TClient from "@/types/client";
import TServiceOrder from "@/types/serviceOrder";

export default function useServiceOrders() {
  const { data, error, mutate } = useSWR(`/api/private/serviceOrders`);

  return {
    serviceOrders: data as ServiceOrders | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

interface ServiceOrder extends TServiceOrder {
  owner: TClient;
}
type ServiceOrders = ServiceOrder[];

export type { ServiceOrders };
