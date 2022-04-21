import useSWR from "swr";

import Client from "@/types/client";

export default function useClients() {
  const { data, error, mutate } = useSWR("/api/admin/clients");

  return {
    clients: data as Client[] | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
