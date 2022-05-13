import { TClientInput, TClientWithSOs } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";

import request from "../request";

export default async (
  id: number,
  updateClient: TClientInput,
  serviceOrder?: TServiceOrderInput
) => {
  const { response, status } = await request({
    method: "PUT",
    url: "/api/private/clients",
    body: { clientID: id, ...updateClient, ...serviceOrder },
  });

  const client = response as TClientWithSOs;

  return { client, status };
};
