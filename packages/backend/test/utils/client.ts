import request from "supertest";
import { expect } from "vitest";

import app from "./app";
import { generateClient, generateServiceOrder } from "./generators";
import getAuth from "./getAuth";

export const createClient = async (
  client: ReturnType<typeof generateClient>,
  serviceOrder?: ReturnType<typeof generateServiceOrder>
) => {
  const response = await request(app)
    .post("/api/private/clients")
    .send({ client, serviceOrder })
    .set("Authorization", await getAuth());
  const newClient = response.body;

  if (serviceOrder) {
    expect(newClient.serviceOrders).to.be.an("array");
    expect(newClient.serviceOrders).to.have.length(1);

    const newServiceOrder = newClient.serviceOrders[0];
    return { clientId: newClient.id, serviceOrderId: newServiceOrder.id };
  }

  return { clientId: newClient.id };
};
