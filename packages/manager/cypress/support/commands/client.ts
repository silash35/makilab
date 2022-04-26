import { ServiceOrder } from "../types";
import { Client } from "../types";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to create a Client using passed client and, optionally, a serviceOrder
       * @example cy.createPlace(place)
       */
      createClient(client: Client, serviceOrder?: ServiceOrder): void;
    }
  }
}

Cypress.Commands.add("createClient", (client, serviceOrder) => {
  cy.request("POST", "/api/admin/clients", { client, ...serviceOrder }).then((response) => {
    expect(response.status).equal(200);
    cy.log(response.body);
    cy.log(JSON.stringify(response.body));
  });
});

export {};
