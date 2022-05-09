import ResponseClient from "../../../../src/types/client";
import ServiceOrder from "../../../../src/types/serviceOrder";
import { generateClient, generateServiceOrder } from "../../../support/generators";
import testSafety from "../../../support/testSafety";

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
      body: { client, serviceOrder },
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
      body: { client },
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
        body: {
          client: generateClient(false, testValue),
          serviceOrder: generateServiceOrder(false, testValue),
        },
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
        body: { client },
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
      const client = generateClient();
      const serviceOrder = generateServiceOrder();

      cy.authFetch({
        method: "POST",
        url: "/api/private/clients",
        body: { client, serviceOrder: { ...serviceOrder, createdAt: testValue } },
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
      body: { client, serviceOrder: { ...serviceOrder, createdAt: "a" } },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(400);
      expect(response.body).contains("Invalid data");
    });
  });
});

export {};
