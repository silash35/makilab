import { ServiceOrder } from "../types";
import { Client } from "../types";
import ResponseClient from "@/types/client";

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
  cy.request("POST", "/api/admin/clients", { clientID: 0, ...client, ...serviceOrder }).then(
    (response) => {
      expect(response.status).equal(200);
      const newClient = response.body as ResponseClient;
      cy.wrap(newClient.id).as("clientId");

      if (serviceOrder) {
        if (newClient.serviceOrders && newClient.serviceOrders?.length > 0) {
          const newServiceOrder = newClient.serviceOrders[newClient.serviceOrders.length - 1];
          cy.wrap(newServiceOrder.id).as("serviceOrderId");
        } else {
          throw new Error("Service Order not created");
        }
      }
    }
  );
});

export {};