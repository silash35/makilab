import { TClientInput, TClientWithSOs } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";

import request from "../request";

export default async (
  id: number,
  updateClient: TClientInput,
  newServiceOrder?: TServiceOrderInput
) => {
  const { response, status, error } = await request({
    method: "PUT",
    url: "/api/private/clients",
    body: { clientId: id, client: updateClient, serviceOrder: newServiceOrder },
  });

  const client = response as TClientWithSOs;

  return { client, status, error };
};
