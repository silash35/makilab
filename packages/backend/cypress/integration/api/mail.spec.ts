import { faker } from "@faker-js/faker";

import testSafety from "../../support/testSafety";

describe("Mail API - POST", () => {
  const email = {
    to: faker.internet.email(),
    text: faker.lorem.paragraph(),
  };

  it("should not send Email when unauthenticated", () => {
    testSafety("POST", "/api/private/mail", email);
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
