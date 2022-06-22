import Client from "@test/types/client";
import ServiceOrder from "@test/types/serviceOrder";
import app from "@test/utils/app";
import { generateClient, generateServiceOrder } from "@test/utils/generators";
import getAuth from "@test/utils/getAuth";
import testSafety from "@test/utils/testSafety";
import request from "supertest";

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
    expect(newClient.serviceOrders).to.be.an("array");
    expect(newClient.serviceOrders).to.have.length(1);
    const newServiceOrder = newClient.serviceOrders?.[0];

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

  it("should create only a new client", async () => {
    const client = generateClient();
    const res = await request(app)
      .post("/api/private/clients")
      .send({ client })
      .set("Authorization", await getAuth())
      .expect(200);

    expect(res.status).equal(200);
    const newClient = res.body as Client;

    expect(newClient.serviceOrders).to.be.an("array");
    expect(newClient.serviceOrders?.length).to.be.equal(0);
    expect(newClient.name).to.be.equal(client.name);
  });

  it("should create even with minimum values", async () => {
    const testValues = [null, undefined, NaN, "", []];

    for (const testValue of testValues) {
      const res = await request(app)
        .post("/api/private/clients")
        .send({
          client: generateClient(false, testValue),
          serviceOrder: generateServiceOrder(false, testValue),
        })
        .set("Authorization", await getAuth())
        .expect(200);

      const newClient = res.body as Client;

      expect(newClient.email).to.be.null;
      expect(newClient.address).to.be.null;
      expect(newClient.zip).to.be.null;
      expect(newClient.whatsapp).to.be.null;
      expect(newClient.tel).to.be.null;
      expect(newClient.cpfOrCnpj).to.be.null;

      // its a new client so the first service order should be the one created
      const newServiceOrder = (newClient.serviceOrders as ServiceOrder[])[0];

      expect(newServiceOrder.brand).to.be.null;
      expect(newServiceOrder.model).to.be.null;
      expect(newServiceOrder.productNumber).to.be.null;
      expect(newServiceOrder.batchOrImei).to.be.null;
      expect(newServiceOrder.problemDescription).to.be.null;
      expect(newServiceOrder.productCondition).to.be.null;
      expect(newServiceOrder.accessories).to.be.null;
      expect(newServiceOrder.listOfServices).to.be.null;
      expect(newServiceOrder.notes).to.be.null;
    }
  });

  it("Should fail when invalid necessary values", async () => {
    const testValues = [null, undefined, NaN, "", [], {}];

    for (const testValue of testValues) {
      const res = await request(app)
        .post("/api/private/clients")
        .send({
          client: { name: testValue },
        })
        .set("Authorization", await getAuth())
        .expect(400);

      expect(res.body.message).be.equal("Invalid data: Client Name");
    }
  });

  it("Should create with correct date values", async () => {
    const now = new Date();
    const testValues = [
      now,
      now.toLocaleString(),
      now.toString(),
      now.toUTCString(),
      now.toISOString(),
      now.toJSON(),
    ];

    for (const testValue of testValues) {
      const client = generateClient();
      const serviceOrder = generateServiceOrder();

      const res = await request(app)
        .post("/api/private/clients")
        .send({ client, serviceOrder: { ...serviceOrder, createdAt: testValue } })
        .set("Authorization", await getAuth())
        .expect(200);

      const newClient = res.body as Client;
      const newServiceOrder = (newClient.serviceOrders as ServiceOrder[])[0];

      // Always should be the in UTC time
      expect(String(newServiceOrder.createdAt).slice(-1)).to.be.equal("Z");

      // Remove the sssZ part of the date before comparing it
      expect(String(newServiceOrder.createdAt).slice(0, -4)).to.be.equal(
        now.toISOString().slice(0, -4)
      );
    }
  });

  it("Should not fail when invalid date value", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    const res = await request(app)
      .post("/api/private/clients")
      .send({ client, serviceOrder: { ...serviceOrder, createdAt: "a" } })
      .set("Authorization", await getAuth())
      .expect(400);

    expect(res.body.message).be.equal("Invalid data: Date");
  });
});
