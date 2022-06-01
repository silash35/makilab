import request from "supertest";
import { describe, expect, it } from "vitest";

import Client from "../../types/client";
import app from "../../utils/app";
import { generateClient, generateServiceOrder } from "../../utils/generators";
import getAuth from "../../utils/getAuth";
import testSafety from "../../utils/testSafety";

describe("Clients API - POST", () => {
  it("should return 401 when unauthenticated", async () => {
    await testSafety("post", "/api/private/clients", {
      client: generateClient(),
      serviceOrder: generateServiceOrder(),
    });
  });

  it("should create a new client and service Order", async () => {
    const client = generateClient();
    client.cpfOrCnpj = "01test376388/t00gfg01-5gggg3";
    client.tel = "02texts will be removed34-only Numbers will remain4321";
    const serviceOrder = generateServiceOrder();

    const res = await request(app)
      .post("/api/private/clients")
      .send({ client, serviceOrder })
      .set("Authorization", await getAuth())
      .expect(200);

    expect(res.status).equal(200);
    const newClient = res.body as Client;
    // its a new client so the first service order should be the one created
    const newServiceOrder = newClient.serviceOrders[0];

    expect(newClient.name).to.be.equal(client.name);
    // Check if the numbers was properly formatted
    expect(newClient.cpfOrCnpj).to.be.equal("01.376.388/0001-53");
    expect(newClient.tel).to.be.equal("+55 71 0234-4321");

    expect(newServiceOrder?.equipment).to.be.equal(serviceOrder.equipment);
    expect(newServiceOrder?.notes).to.be.equal(serviceOrder.notes);
    expect(newServiceOrder?.isUnderWarranty).to.be.equal(serviceOrder.isUnderWarranty);
    expect(newServiceOrder?.statusName).to.be.equal(
      serviceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
    );
  });
});
