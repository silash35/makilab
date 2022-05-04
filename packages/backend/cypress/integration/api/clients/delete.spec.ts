import ResponseClient from "../../../../src/types/client";
import { generateClient } from "../../../support/generators";
import testSafety from "../../../support/testSafety";

describe("Clients API - DELETE", () => {
  it("should return 401 when unauthenticated", () => {
    testSafety("DELETE", "/api/private/clients", generateClient());
  });

  it("should return 400 when send invalid values", () => {
    cy.signIn();

    const testValues = [null, undefined, NaN, "", "a"];
    testValues.forEach((testValue) => {
      cy.authFetch({
        method: "DELETE",
        url: "/api/private/clients",
        body: { id: testValue },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).equal(400);
        expect(response.body).contains("Invalid data");
      });
    });
  });

  it("should delete all clients", () => {
    cy.signIn();

    cy.authFetch({
      method: "GET",
      url: "/api/private/clients",
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.be.an("array");

      const allClients = response.body as ResponseClient[];
      allClients.forEach((client) => {
        cy.authFetch({
          method: "DELETE",
          url: "/api/private/clients",
          body: { id: client.id },
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.deletedID).equal(client.id);
        });
      });
    });

    cy.authFetch({
      method: "GET",
      url: "/api/private/clients",
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).equal(0);
    });
  });
});

export {};
