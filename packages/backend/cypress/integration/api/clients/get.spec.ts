import ResponseClient from "../../../../src/types/client";
import ServiceOrder from "../../../../src/types/serviceOrder";
import { generateClient, generateServiceOrder } from "../../../support/generators";
import testSafety from "../../../support/testSafety";

describe("Clients API - GET", () => {
  it("should return 401 when unauthenticated", () => {
    testSafety("GET", "/api/private/clients");
  });

  it("should return a array of clients when authenticated", () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    cy.signIn();
    cy.createClient(client, serviceOrder);

    cy.get("@clientID").then((clientID) => {
      cy.authFetch({
        method: "GET",
        url: "/api/private/clients",
      }).then((response) => {
        expect(response.status).equal(200);
        expect(response.body).to.be.an("array");

        const clients = response.body as ResponseClient[];
        const newClient = clients.find((c) => c.id === (clientID as unknown as number));

        console.log(clients);
        console.log(client);

        expect(newClient.name).to.be.equal(client.name);
        expect(newClient.serviceOrders[0].equipment).to.be.equal(serviceOrder.equipment);
      });
    });
  });
});

export {};
