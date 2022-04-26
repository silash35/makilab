import { clients } from "../../fixtures/clients.json";
import { serviceOrders } from "../../fixtures/serviceOrders.json";

describe("Search API", () => {
  before(() => {
    cy.createClient(clients[0], serviceOrders[0]);
  });

  it("should search by ID when using POST Method", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/auth/signin");
  });

  it("should load when authenticated", () => {
    cy.signIn();

    cy.visit("/");
    cy.location("pathname").should("equal", "/");

    cy.get("main").find("a").should("have.length", 4);
    // cy.contains("Admin Panel");
  });
});

export {};
