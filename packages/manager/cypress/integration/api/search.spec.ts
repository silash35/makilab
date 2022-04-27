import { clients } from "../../fixtures/clients.json";
import { serviceOrders } from "../../fixtures/serviceOrders.json";

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
  it("should search by ID", () => {
    cy.signIn();
    cy.createClient(clients[0], serviceOrders[0]);
    cy.signOut();

    cy.get("@serviceOrderId").then((serviceOrderId) => {
      cy.request("POST", "/api/search", { search: serviceOrderId }).then((response) => {
        expect(response.status).equal(200);
        const serviceOrder = response.body as ServiceOrder;

        expect(serviceOrder.id).equal(serviceOrderId);
        expect(serviceOrder.isUnderWarranty).equal(serviceOrders[0].isUnderWarranty);
      });
    });
  });

  it("should not search invalid data", () => {
    const testValues = [null, undefined, NaN, "", "a"];
    testValues.forEach((testValue) => {
      cy.request({
        method: "POST",
        url: "/api/search",
        body: { search: testValue },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).equal(400);
        expect(response.body).contains("Invalid data");
      });
    });
  });

  it("should return not found when valid search, but inexistent SO", () => {
    const testValues = [99999999, "OS99999999", "OS94334-42342542"];
    testValues.forEach((testValue) => {
      cy.request({
        method: "POST",
        url: "/api/search",
        body: { search: testValue },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).equal(404);
        expect(response.body).contains("Not Found");
      });
    });
  });
});

export {};
