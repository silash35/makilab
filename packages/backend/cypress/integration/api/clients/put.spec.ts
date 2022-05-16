import ResponseClient from "../../../../src/types/client";
import ServiceOrder from "../../../../src/types/serviceOrder";
import { generateClient, generateServiceOrder } from "../../../support/generators";
import testSafety from "../../../support/testSafety";

describe("Clients API - PUT", () => {
  it("should return 401 when unauthenticated", () => {
    testSafety("PUT", "/api/private/clients", generateClient());
  });

  it("should only update the client", () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    cy.signIn();
    cy.createClient(client, serviceOrder);

    cy.get("@clientID").then((clientID) => {
      const newClient = generateClient();

      cy.authFetch({
        method: "PUT",
        url: "/api/private/clients",
        body: { clientID, client: newClient },
      }).then((response) => {
        expect(response.status).equal(200);

        const responseClient = response.body as ResponseClient;
        const responseSOs = responseClient.serviceOrders as ServiceOrder[];
        const responseSO = responseSOs[0];

        expect(responseClient.name).to.be.equal(newClient.name);

        expect(responseSOs).to.be.an("array");
        expect(responseSOs.length).to.be.equal(1);

        expect(responseSO.equipment).to.be.equal(serviceOrder.equipment);
        expect(responseSO.notes).to.be.equal(serviceOrder.notes);
        expect(responseSO.isUnderWarranty).to.be.equal(serviceOrder.isUnderWarranty);
        expect(responseSO.statusName).to.be.equal(
          serviceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
        );
      });
    });
  });

  it("should update the client and create a new service Order", () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    cy.signIn();
    cy.createClient(client, serviceOrder);

    cy.get("@clientID").then((clientID) => {
      const newClient = generateClient();
      const newServiceOrder = generateServiceOrder();

      cy.authFetch({
        method: "PUT",
        url: "/api/private/clients",
        body: { clientID, client: newClient, serviceOrder: newServiceOrder },
      }).then((response) => {
        expect(response.status).equal(200);

        const responseClient = response.body as ResponseClient;
        const responseSOs = responseClient.serviceOrders as ServiceOrder[];
        const responseOldSO = responseSOs[0];
        const responseNewSO = responseSOs[1];

        expect(responseClient.name).to.be.equal(newClient.name);

        expect(responseSOs).to.be.an("array");
        expect(responseSOs.length).to.be.equal(2);

        expect(responseOldSO.equipment).to.be.equal(serviceOrder.equipment);
        expect(responseOldSO.notes).to.be.equal(serviceOrder.notes);
        expect(responseOldSO.isUnderWarranty).to.be.equal(serviceOrder.isUnderWarranty);
        expect(responseOldSO.statusName).to.be.equal(
          serviceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
        );

        expect(responseNewSO.equipment).to.be.equal(newServiceOrder.equipment);
        expect(responseNewSO.notes).to.be.equal(newServiceOrder.notes);
        expect(responseNewSO.isUnderWarranty).to.be.equal(newServiceOrder.isUnderWarranty);
        expect(responseNewSO.statusName).to.be.equal(
          newServiceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
        );
      });
    });
  });

  it("should update even with minimum values", () => {
    cy.signIn();
    cy.createClient(generateClient());

    cy.get("@clientID").then((clientID) => {
      const testValues = [null, undefined, NaN, "", []];
      testValues.forEach((testValue) => {
        cy.authFetch({
          method: "PUT",
          url: "/api/private/clients",
          body: { clientID, client: generateClient(false, testValue) },
        }).then((response) => {
          expect(response.status).equal(200);

          const updatedClient = response.body as ResponseClient;

          expect(updatedClient.email).to.be.null;
          expect(updatedClient.address).to.be.null;
          expect(updatedClient.zip).to.be.null;
          expect(updatedClient.whatsapp).to.be.null;
          expect(updatedClient.tel).to.be.null;
          expect(updatedClient.cpfOrCnpj).to.be.null;

          expect(updatedClient.serviceOrders).to.be.an("array");
          expect(updatedClient.serviceOrders.length).to.be.equal(0);
        });
      });
    });
  });

  it("should not update the client when invalid data", () => {
    cy.signIn();
    const client = generateClient();
    cy.createClient(client);

    cy.get("@clientID").then((clientID) => {
      const testValues = [null, undefined, NaN, "", [], {}];
      testValues.forEach((testValue) => {
        cy.authFetch({
          method: "PUT",
          url: "/api/private/clients",
          body: { clientID, client: { name: testValue } },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).equal(200);
          expect(response.body.name).equal(client.name);
        });
      });
    });
  });
});

export {};
