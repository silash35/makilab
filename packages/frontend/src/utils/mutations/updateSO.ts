import TServiceOrder, { TServiceOrderInput } from "@/types/serviceOrder";
import TClient from "@/types/client";
import request from "../request";

export default async (id: number, serviceOrder: TServiceOrderInput) => {
  const { response, status } = await request({
    method: "POST",
    url: "/api/private/serviceOrders",
    body: { id, ...serviceOrder },
  });

  const updatedServiceOrder = response as ServiceOrder;

  return { updatedServiceOrder, status };
};

interface ServiceOrder extends TServiceOrder {
  owner: TClient;
}
