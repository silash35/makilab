import TServiceOrder, { TServiceOrderUpdateStatusInput } from "@/types/serviceOrder";
import TClient from "@/types/client";
import request from "../request";

export default async (serviceOrder: TServiceOrderUpdateStatusInput) => {
  const { response, status } = await request({
    method: "PUT",
    url: "/api/private/serviceOrders",
    body: serviceOrder,
  });

  const updatedServiceOrder = response as ServiceOrder;

  return { updatedServiceOrder, status };
};

interface ServiceOrder extends TServiceOrder {
  owner: TClient;
}
