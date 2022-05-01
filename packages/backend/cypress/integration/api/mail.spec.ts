import { faker } from "@faker-js/faker";

describe("Mail API - POST", () => {
  const email = {
    to: faker.internet.email(),
    text: faker.lorem.paragraph(),
  };

  it("should not send Email when unauthenticated", () => {
    cy.request({
      method: "POST",
      url: "/api/private/mail",
      body: email,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(401);
      expect(response.body).contains("Unauthorized");
    });
  });

  it("should send Email when authenticated", () => {
    cy.signIn();

    cy.authFetch({
      method: "POST",
      url: "/api/private/mail",
      body: email,
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.status).equal("success");

      cy.request(response.body.testMessageUrl).its("body").should("include", email.text);
    });
  });
});

export {};
