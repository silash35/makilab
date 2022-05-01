declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to sign in
       * @example cy.signIn()
       */
      signIn(): void;

      /**
       * Custom command to fetch data with authorization header
       * @example cy.authFetch(options, then)
       */
      authFetch(
        options: Partial<RequestOptions>,
        then: (response: Cypress.Response<any>) => void
      ): void;
    }
  }
}

// It's the same value as the one in .env file. I can't find a way to get it from cypress.
const password = "password";

Cypress.Commands.add("signIn", () => {
  cy.session(password, () => {
    cy.request("POST", "/api/auth/signin", { password }).then((response) => {
      cy.wrap(response.body.token).as("token");
      expect(response.status).equal(200);
    });
  });
});

Cypress.Commands.add("authFetch", (options, then) => {
  cy.get("@token").then((token) => {
    cy.request({
      ...options,
      headers: {
        authorization: token,
      },
    }).then(then);
  });
});

export {};
