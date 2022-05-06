import useSWR from "swr";

import TClient from "@/types/client";
import TServiceOrder from "@/types/serviceOrder";

export default function useServiceOrder(id: string) {
  const { data, error, mutate } = useSWR(`/api/private/serviceOrders?id=${id}`);

  return {
    serviceOrder: data as ServiceOrder | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

interface ServiceOrder extends TServiceOrder {
  owner: TClient;
}

export type { ServiceOrder };
