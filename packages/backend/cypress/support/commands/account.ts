declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to sign in to Alis
       * @example cy.signIn()
       */
      signIn(): void;

      /**
       * Custom command to sign out to Alis
       * @example cy.signIn()
       */
      signOut(): void;
    }
  }
}

// It's the same value as the one in .env file. I can't find a way to get it from cypress.
const password = "password";

Cypress.Commands.add("signIn", () => {
  cy.session(password, () => {
    cy.request("POST", "/api/auth/signin", { password }).then((response) => {
      cy.setCookie("token", response.body.token);
    });
  });
});

Cypress.Commands.add("signOut", () => {
  cy.visit("/");
  cy.clearCookies();
  cy.getCookies().should("be.empty");
  cy.reload();
});

export {};
