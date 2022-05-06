import { generateClient, generateServiceOrder } from "../support/generators";

describe("Home Page", () => {
  it("should load even if unauthenticated", () => {
    cy.visit("/");
    cy.contains("This is a backend of OpenSOM. Where the magic happens.");
  });
});

it("should create a new client and service Order", () => {
  cy.signIn();

  cy.authFetch({
    method: "POST",
    url: "/api/private/clients",
    body: { ...generateClient(), ...generateServiceOrder() },
  }).then((response) => {
    expect(response.status).equal(200);
    console.log(response.body);
  });
});

export {};
