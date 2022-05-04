declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to sign in
       * @example cy.signIn()
       */
      signIn(): void;

      /**
       * Custom command to sign out
       * @example cy.signOut()
       */
      signOut(): void;

      /**
       * Custom command to fetch data with authorization header
       * @example cy.authFetch(options, then)
       */
      authFetch(options: Partial<RequestOptions>): Cypress.Chainable<Cypress.Response<any>>;
    }
  }
}

// It's the same value as the one in .env file. I can't find a way to get it from cypress.
const password = "password";

Cypress.Commands.add("signIn", () => {
  cy.session(password, () => {
    cy.request("POST", "/api/auth/signin", { password }).then((response) => {
      expect(response.status).equal(200);
      localStorage.setItem("token", response.body.token);
    });
  });
});

Cypress.Commands.add("signOut", () => {
  cy.clearLocalStorage();
});

Cypress.Commands.add("authFetch", (options) => {
  const token = localStorage.getItem("token");

  return cy.request({
    ...options,
    headers: {
      authorization: token,
    },
  });
});

export {};
