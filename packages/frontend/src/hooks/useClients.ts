import useSWR from "swr";
import TClient from "@/types/client";
import TServiceOrder from "@/types/serviceOrder";

export default function useClients() {
  const { data, error, mutate } = useSWR("/api/private/clients");

  return {
    clients: data as Clients | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}

interface Client extends TClient {
  ServiceOrders: TServiceOrder[];
}

type Clients = Client[];
export type { Clients };
