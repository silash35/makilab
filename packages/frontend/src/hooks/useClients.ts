import useSWR from "swr";

import { TClientWithSOs } from "@/types/client";

export default function useClients(query = "") {
  const { data, error, mutate } = useSWR(`/api/private/clients${query}`);

  return {
    clients: data as TClientWithSOs[] | undefined,
    isLoading: !error && !data,
    mutate,
    error,
  };
}
