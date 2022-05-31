import request from "supertest";
import { describe, expect, it } from "vitest";

import app from "../utils/app";
import { createClient } from "../utils/client";
import { generateClient, generateServiceOrder } from "../utils/generators";

interface ServiceOrder {
  id: number;
  name: string;
  isUnderWarranty: boolean;
  isBudgetApproved: boolean | null;
  createdAt: Date;
  budgetedAt: Date | null;
  budgetAnsweredAt: Date | null;
  repairedAt: Date | null;
  deliveredToCustomerAt: Date | null;
}

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
        const createdServiceOrder = response.body as ServiceOrder;

        expect(createdServiceOrder.id).equal(serviceOrderId);
        expect(createdServiceOrder.isUnderWarranty).equal(serviceOrder.isUnderWarranty);
      });
  });

  it("should not search invalid data", async () => {
    const testValues = [null, undefined, NaN, "", "a"];

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
    const testValues = [99999999, "OS99999999", "OS94334-42342542"];
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
