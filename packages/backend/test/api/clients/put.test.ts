import request from "supertest";
import { describe, expect, it } from "vitest";

import Client from "../../types/client";
import ServiceOrder from "../../types/serviceOrder";
import app from "../../utils/app";
import { createClient } from "../../utils/client";
import { generateClient, generateServiceOrder } from "../../utils/generators";
import getAuth from "../../utils/getAuth";
import testSafety from "../../utils/testSafety";

describe("Clients API - PUT", () => {
  it("should return 401 when unauthenticated", async () => {
    const client = generateClient();
    const { clientId } = await createClient(client);
    await testSafety("put", "/api/private/clients", {
      clientID: clientId,
      client: generateClient(),
    });
  });

  it("should only update the client", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();
    const { clientId } = await createClient(client, serviceOrder);

    const newClient = generateClient();
    const res = await request(app)
      .put("/api/private/clients")
      .send({ clientID: clientId, client: newClient })
      .set("Authorization", await getAuth())
      .expect(200);

    const responseClient = res.body as Client;
    const responseSOs = responseClient.serviceOrders as ServiceOrder[];
    const responseSO = responseSOs[0];

    expect(responseClient.name).to.be.equal(newClient.name);

    expect(responseSOs).to.be.an("array");
    expect(responseSOs.length).to.be.equal(1);

    expect(responseSO.equipment).to.be.equal(serviceOrder.equipment);
    expect(responseSO.notes).to.be.equal(serviceOrder.notes);
    expect(responseSO.isUnderWarranty).to.be.equal(serviceOrder.isUnderWarranty);
    expect(responseSO.statusName).to.be.equal(
      serviceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
    );
  });

  it("should update the client and create a new service Order", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();
    const { clientId } = await createClient(client, serviceOrder);

    const newClient = generateClient();
    const newServiceOrder = generateServiceOrder();

    const res = await request(app)
      .put("/api/private/clients")
      .send({ clientID: clientId, client: newClient, serviceOrder: newServiceOrder })
      .set("Authorization", await getAuth())
      .expect(200);

    const responseClient = res.body as Client;
    const responseSOs = responseClient.serviceOrders as ServiceOrder[];
    const responseOldSO = responseSOs[0];
    const responseNewSO = responseSOs[1];

    expect(responseClient.name).to.be.equal(newClient.name);

    expect(responseSOs).to.be.an("array");
    expect(responseSOs.length).to.be.equal(2);

    expect(responseOldSO.equipment).to.be.equal(serviceOrder.equipment);
    expect(responseOldSO.notes).to.be.equal(serviceOrder.notes);
    expect(responseOldSO.isUnderWarranty).to.be.equal(serviceOrder.isUnderWarranty);
    expect(responseOldSO.statusName).to.be.equal(
      serviceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
    );

    expect(responseNewSO.equipment).to.be.equal(newServiceOrder.equipment);
    expect(responseNewSO.notes).to.be.equal(newServiceOrder.notes);
    expect(responseNewSO.isUnderWarranty).to.be.equal(newServiceOrder.isUnderWarranty);
    expect(responseNewSO.statusName).to.be.equal(
      newServiceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
    );
  });

  it("should update even with minimum values", async () => {
    const { clientId } = await createClient(generateClient());

    const testValues = [null, undefined, NaN, "", []];
    for (const testValue of testValues) {
      const res = await request(app)
        .put("/api/private/clients")
        .send({ clientID: clientId, client: generateClient(false, testValue) })
        .set("Authorization", await getAuth())
        .expect(200);

      const updatedClient = res.body as Client;

      expect(updatedClient.email).to.be.null;
      expect(updatedClient.address).to.be.null;
      expect(updatedClient.zip).to.be.null;
      expect(updatedClient.whatsapp).to.be.null;
      expect(updatedClient.tel).to.be.null;
      expect(updatedClient.cpfOrCnpj).to.be.null;

      expect(updatedClient.serviceOrders).to.be.an("array");
      expect(updatedClient.serviceOrders.length).to.be.equal(0);
    }
  });

  it("should not update the client when invalid data", async () => {
    const client = generateClient();
    const { clientId } = await createClient(client);

    const testValues = [null, undefined, NaN, "", [], {}];
    for (const testValue of testValues) {
      const res = await request(app)
        .put("/api/private/clients")
        .send({ clientID: clientId, client: { name: testValue } })
        .set("Authorization", await getAuth())
        .expect(400);

      expect(res.body.message).to.be.equal("Invalid data: Client Name");
    }
  });
});
