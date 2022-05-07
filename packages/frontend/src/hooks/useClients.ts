import useSWR from "swr";

import { TClientWithSOs } from "@/types/client";

export default function useClients() {
  const { data, error, mutate } = useSWR("/api/private/clients");

  return {
    clients: data as TClientWithSOs[] | undefined,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
