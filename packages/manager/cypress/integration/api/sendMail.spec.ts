import { faker } from "@faker-js/faker";

describe("Send Mail API - POST", () => {
  const email = {
    to: faker.internet.email(),
    text: faker.lorem.paragraph(),
  };

  it("should not send Email when unauthenticated", () => {
    cy.request({
      method: "POST",
      url: "/api/admin/sendMail",
      body: email,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).equal(401);
      expect(response.body).contains("Unauthorized");
    });
  });

  it("should send Email when authenticated", () => {
    cy.signIn();

    cy.request("POST", "/api/admin/sendMail", email).then((response) => {
      expect(response.status).equal(200);
      expect(response.body.status).equal("success");

      cy.request(response.body.TestMessageUrl).its("body").should("include", email.text);
    });
  });
});

export {};
