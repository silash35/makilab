import ResponseClient from "../../../src/types/client";
import ServiceOrder from "../../../src/types/serviceOrder";
import { generateClient, generateServiceOrder } from "../../support/generators";
import testSafety from "../../support/testSafety";

describe("Clients API - GET", () => {
  it("should return 401 when unauthenticated", () => {
    testSafety("GET", "/api/private/clients");
  });

  it("should return a array of clients when authenticated", () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    cy.signIn();
    cy.createClient(client, serviceOrder);

    cy.authFetch({
      method: "GET",
      url: "/api/private/clients",
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.be.an("array");

      const clients = response.body as ResponseClient[];
      const newClient = clients.at(-1);

      expect(newClient.name).to.be.equal(client.name);
      expect(newClient.serviceOrders[0].equipment).to.be.equal(serviceOrder.equipment);
    });
  });
});

describe("Clients API - POST", () => {
  it("should return 401 when unauthenticated", () => {
    testSafety("POST", "/api/private/clients", generateClient());
  });

  it("should create a new client and service Order", () => {
    const client = generateClient();
    client.cpfOrCnpj = "01test376388/t00gfg01-5gggg3";
    client.tel = "02texts will be removed34-only Numbers will remain4321";
    const serviceOrder = generateServiceOrder();
    cy.signIn();

    cy.authFetch({
      method: "POST",
      url: "/api/private/clients",
      body: { ...client, ...serviceOrder },
    }).then((response) => {
      expect(response.status).equal(200);
      const newClient = response.body as ResponseClient;
      // its a new client so the first service order should be the one created
      const newServiceOrder = (newClient.serviceOrders as ServiceOrder[])[0];

      expect(newClient.name).to.be.equal(client.name);
      // Check if the numbers was properly formatted
      expect(newClient.cpfOrCnpj).to.be.equal("01.376.388/0001-53");
      expect(newClient.tel).to.be.equal("+55 71 0234-4321");

      expect(newServiceOrder?.equipment).to.be.equal(serviceOrder.equipment);
      expect(newServiceOrder?.notes).to.be.equal(serviceOrder.notes);
      expect(newServiceOrder?.isUnderWarranty).to.be.equal(serviceOrder.isUnderWarranty);
      expect(newServiceOrder?.statusName).to.be.equal(
        serviceOrder.isUnderWarranty ? "Esperando criar OSF" : "Esperando Avaliação"
      );
    });
  });

  it("should create only a new client", () => {
    const client = generateClient();
    cy.signIn();

    cy.authFetch({
      method: "POST",
      url: "/api/private/clients",
      body: client,
    }).then((response) => {
      expect(response.status).equal(200);
      const newClient = response.body as ResponseClient;

      expect(newClient.serviceOrders).to.be.an("array");
      expect(newClient.serviceOrders?.length).to.be.equal(0);

      expect(newClient.name).to.be.equal(client.name);
    });
  });

  it("should create even with minimum values", () => {
    cy.signIn();

    const testValues = [null, undefined, NaN, "", []];
    testValues.forEach((testValue) => {
      cy.authFetch({
        method: "POST",
        url: "/api/private/clients",
        body: { ...generateClient(false, testValue), ...generateServiceOrder(false, testValue) },
      }).then((response) => {
        expect(response.status).equal(200);

        const newClient = response.body as ResponseClient;

        expect(newClient.email).to.be.null;
        expect(newClient.address).to.be.null;
        expect(newClient.zip).to.be.null;
        expect(newClient.whatsapp).to.be.null;
        expect(newClient.tel).to.be.null;
        expect(newClient.cpfOrCnpj).to.be.null;

        // its a new client so the first service order should be the one created
        const newServiceOrder = (newClient.serviceOrders as ServiceOrder[])[0];

        expect(newServiceOrder.brand).to.be.null;
        expect(newServiceOrder.model).to.be.null;
        expect(newServiceOrder.productNumber).to.be.null;
        expect(newServiceOrder.batchOrImei).to.be.null;
        expect(newServiceOrder.problemDescription).to.be.null;
        expect(newServiceOrder.productCondition).to.be.null;
        expect(newServiceOrder.accessories).to.be.null;
        expect(newServiceOrder.listOfServices).to.be.null;
        expect(newServiceOrder.notes).to.be.null;
      });
    });
  });

  it("Should fail when invalid necessary values", () => {
    cy.signIn();

    const testValues = [null, undefined, NaN, "", [], {}];
    testValues.forEach((testValue) => {
      // Generate client with invalid required values should fail
      cy.authFetch({
        method: "POST",
        url: "/api/private/clients",
        body: { name: testValue },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).equal(400);
        expect(response.body).contains("Invalid data");
      });

      // Generate client with invalid Service Order required values should succeed
      // but the service order should not be created
      const client = generateClient();
      cy.authFetch({
        method: "POST",
        url: "/api/private/clients",
        body: { ...client },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).equal(200);
        const newClient = response.body as ResponseClient;

        const serviceOrders = newClient.serviceOrders as ServiceOrder[];

        expect(serviceOrders).to.be.an("array");
        expect(serviceOrders.length).to.be.equal(0);
        expect(newClient.name).to.be.equal(client.name);
      });
    });
  });

  it("Should create with correct date values", () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    cy.signIn();

    const now = new Date();
    const testValues = [
      now,
      now.toLocaleString(),
      now.toString(),
      now.toUTCString(),
      now.toISOString(),
      now.toJSON(),
    ];

    testValues.forEach((testValue) => {
      cy.authFetch({
        method: "POST",
        url: "/api/private/clients",
        body: { ...client, ...serviceOrder, createdAt: testValue },
      }).then((response) => {
        expect(response.status).equal(200);
        const newClient = response.body as ResponseClient;
        const newServiceOrder = (newClient.serviceOrders as ServiceOrder[])[0];

        // Always should be the in UTC time
        expect(String(newServiceOrder.createdAt).slice(-1)).to.be.equal("Z");

        // Remove the sssZ part of the date before comparing it
        expect(String(newServiceOrder.createdAt).slice(0, -4)).to.be.equal(
          now.toISOString().slice(0, -4)
        );
      });
    });
  });

  it("Should not fail when invalid date value", () => {
    const client = generateClient();
    const serviceOrder = generateServiceOrder();

    cy.signIn();

    cy.authFetch({
      method: "POST",
      url: "/api/private/clients",
      body: { ...client, ...serviceOrder, createdAt: "a" },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body).contains("Invalid data");
    });
  });
});

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
        body: { clientID, ...newClient },
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
        body: { clientID, ...newClient, ...newServiceOrder },
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
          body: { clientID, ...generateClient(false, testValue) },
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
    cy.createClient(generateClient());

    cy.get("@clientID").then((clientID) => {
      const testValues = [null, undefined, NaN, "", [], {}];
      testValues.forEach((testValue) => {
        cy.authFetch({
          method: "PUT",
          url: "/api/private/clients",
          body: { clientID, name: testValue },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).equal(400);
          expect(response.body).contains("Invalid data");
        });
      });
    });
  });
});

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
