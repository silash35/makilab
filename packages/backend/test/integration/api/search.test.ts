import PublicSO from "@test/types/publicSO";
import app from "@test/utils/app";
import { createClient } from "@test/utils/client";
import { generateClient, generateServiceOrder } from "@test/utils/generators";
import request from "supertest";

describe("Search API - POST", () => {
  it("should search by ID", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    const { serviceOrderId } = await createClient(client, serviceOrder);

    await request(app)
      .post("/api/public/search")
      .send({ search: serviceOrderId })
      .expect(200)
      .then((response) => {
        const createdServiceOrder = response.body as PublicSO;

        expect(createdServiceOrder.id).equal(serviceOrderId);
        expect(createdServiceOrder.isUnderWarranty).equal(serviceOrder.isUnderWarranty);
      });
  });

  it("should not search invalid data", async () => {
    const testValues = [null, undefined, NaN, "", "a", "OS94334-4234254"];

    for (const testValue of testValues) {
      await request(app)
        .post("/api/public/search")
        .send({ search: testValue })
        .expect(400)
        .then((response) => {
          expect(response.body.message).be.equal("Invalid data: id");
        });
    }
  });

  it("should return not found when valid search, but inexistent SO", async () => {
    const testValues = [99999999, "OS99999999", "OS94334-42"];
    for (const testValue of testValues) {
      await request(app)
        .post("/api/public/search")
        .send({ search: testValue })
        .expect(404)
        .then((response) => {
          expect(response.body.message).be.equal("Not Found");
        });
    }
  });
});
