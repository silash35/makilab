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
      .get("/api/public/product/" + serviceOrderId)
      .expect(200)
      .then((response) => {
        const createdServiceOrder = response.body;

        expect(createdServiceOrder.id).equal(serviceOrderId);
        expect(createdServiceOrder.isUnderWarranty).equal(serviceOrder.isUnderWarranty);
      });
  });

  it("should not return private information", async () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    const { serviceOrderId } = await createClient(client, serviceOrder);

    await request(app)
      .get("/api/public/product/" + serviceOrderId)
      .expect(200)
      .then((response) => {
        const createdServiceOrder = response.body;

        expect(createdServiceOrder.attendedBy).toBeUndefined();
        expect(createdServiceOrder.problemDescription).toBeUndefined();
        expect(createdServiceOrder.notes).toBeUndefined();
      });
  });

  it("should not search not int ID", async () => {
    const testValues = [null, undefined, NaN, "a", "OS9334-4254", "0.432", "OS99999", "OS94334-42"];

    for (const testValue of testValues) {
      await request(app)
        .get("/api/public/product/" + testValue)
        .expect(400)
        .then((response) => {
          expect(response.notFound).be.equal(false);

          const { issues } = response.body;
          expect(issues).lengthOf(1);
          expect(issues[0].code).be.equal("invalid_type");
        });
    }
  });

  it("should not search negative ID", async () => {
    const testValues = ["-1", -1, -2, -34234];

    for (const testValue of testValues) {
      await request(app)
        .get("/api/public/product/" + testValue)
        .expect(400)
        .then((response) => {
          expect(response.notFound).be.equal(false);

          const { issues } = response.body;
          expect(issues).lengthOf(1);
          expect(issues[0].code).be.equal("too_small");
        });
    }
  });

  it("should return not found when valid search, but inexistent SO", async () => {
    const testValues = [99999999, "99999999"];
    for (const testValue of testValues) {
      await request(app)
        .get("/api/public/product/" + testValue)
        .expect(404)
        .then((response) => {
          expect(response.body).toBeNull();
          expect(response.notFound).be.equal(true);
        });
    }
  });
});
