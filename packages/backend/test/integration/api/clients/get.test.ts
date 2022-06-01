import Client from "@test/types/client";
import app from "@test/utils/app";
import { createClient } from "@test/utils/client";
import { generateClient, generateServiceOrder } from "@test/utils/generators";
import getAuth from "@test/utils/getAuth";
import testSafety from "@test/utils/testSafety";
import request from "supertest";

describe("Clients API - GET", () => {
  it("should return 401 when unauthenticated", async () => {
    await testSafety("get", "/api/private/clients");
  });

  it("should return a array of clients when authenticated", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    const { clientId } = await createClient(client, serviceOrder);

    const res = await request(app)
      .get("/api/private/clients")
      .set("Authorization", await getAuth())
      .expect(200);

    const clients = res.body as Client[];
    expect(clients).to.be.an("array");

    const newClient = clients.find((c) => c.id === clientId);
    expect(newClient?.id).to.be.equal(clientId);
  });
});
