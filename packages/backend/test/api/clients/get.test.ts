import request from "supertest";
import { describe, expect, it } from "vitest";

import Client from "../../types/client";
import app from "../../utils/app";
import { createClient } from "../../utils/client";
import { generateClient, generateServiceOrder } from "../../utils/generators";
import getAuth from "../../utils/getAuth";
import testSafety from "../../utils/testSafety";

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
    expect(newClient.id).to.be.equal(clientId);
  });
});
