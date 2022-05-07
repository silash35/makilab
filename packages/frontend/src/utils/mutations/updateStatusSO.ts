import TClient from "@/types/client";
import TServiceOrder, { TServiceOrderUpdateStatusInput } from "@/types/serviceOrder";

import request from "../request";

export default async (id: number, serviceOrder: TServiceOrderUpdateStatusInput) => {
  const { response, status } = await request({
    method: "PUT",
    url: "/api/private/serviceOrders",
    body: { id, ...serviceOrder },
  });

  const updatedServiceOrder = response as ServiceOrder;

  return { updatedServiceOrder, status };
};

interface ServiceOrder extends TServiceOrder {
  owner: TClient;
}
