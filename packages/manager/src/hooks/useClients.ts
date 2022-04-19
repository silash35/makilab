import useSWR from "swr";

import { Client } from "@/types/Client";

export default function useClients() {
  const { data, error } = useSWR("/api/admin/clients");

  return {
    clients: data as Client[] | undefined,
    isLoading: !error && !data,
    isError: error,
  };
}
