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
    cy.visit("/");
    cy.location("pathname").should("equal", "/auth/signin");

    cy.get("input[data-testid=password-input]").clear();
    cy.get("input[data-testid=password-input]").type(password + "{enter}");
    cy.location("pathname").should("equal", "/");

    cy.contains("Login").should("not.exist");
  });
});

Cypress.Commands.add("signOut", () => {
  cy.visit("/");
  cy.clearCookies();
  cy.reload();
});

export {};
