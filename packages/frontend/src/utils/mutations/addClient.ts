import TServiceOrder, { TServiceOrderInput } from "@/types/serviceOrder";
import TClient, { TClientInput } from "@/types/client";
import request from "../request";

export default async (client: TClientInput, serviceOrder?: TServiceOrderInput) => {
  const { response, status } = await request({
    method: "POST",
    url: "/api/private/clients",
    body: { ...client, ...serviceOrder },
  });

  const newClient = response as Client;

  return { newClient, status };
};

interface Client extends TClient {
  ServiceOrders: TServiceOrder[];
}
