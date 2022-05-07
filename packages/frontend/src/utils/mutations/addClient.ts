import { TClientInput, TClientWithSOs } from "@/types/client";
import { TServiceOrderInput } from "@/types/serviceOrder";

import request from "../request";

export default async (newClient: TClientInput, serviceOrder?: TServiceOrderInput) => {
  const { response, status } = await request({
    method: "POST",
    url: "/api/private/clients",
    body: { ...newClient, ...serviceOrder },
  });

  const client = response as TClientWithSOs;

  return { client, status };
};
