import { TServiceOrderInput, TServiceOrderWithClient } from "@/types/serviceOrder";

import request from "../request";

export default async (id: number, serviceOrder: TServiceOrderInput) => {
  const { response, status, error } = await request({
    method: "POST",
    url: "/api/private/serviceOrders",
    body: { id, ...serviceOrder },
  });

  const updatedServiceOrder = response as TServiceOrderWithClient;

  return { updatedServiceOrder, status, error };
};
