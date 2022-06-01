import app from "@test/utils/app";
import { createClient } from "@test/utils/client";
import { generateClient, generateServiceOrder } from "@test/utils/generators";
import getAuth from "@test/utils/getAuth";
import testSafety from "@test/utils/testSafety";
import request from "supertest";

describe("Clients API - DELETE", () => {
  it("should return 401 when unauthenticated", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();
    const { clientId } = await createClient(client, serviceOrder);

    await testSafety("delete", "/api/private/clients", { id: clientId });
  });

  it("should return 400 when send invalid values", async () => {
    const testValues = [null, undefined, NaN, "", "a"];

    for (const testValue of testValues) {
      await request(app)
        .delete("/api/private/clients")
        .send({ id: testValue })
        .set("Authorization", await getAuth())
        .expect(400)
        .then((response) => {
          expect(response.body.message).be.equal("Invalid data: id");
        });
    }
  });

  it("should delete a client", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();
    const { clientId } = await createClient(client, serviceOrder);

    await request(app)
      .delete("/api/private/clients")
      .send({ id: clientId })
      .set("Authorization", await getAuth())
      .expect(200)
      .then((response) => {
        expect(response.body.deletedID).be.equal(clientId);
      });
  });
});
