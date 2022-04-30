describe("Sign In Page", () => {
  it("should load when not logged", () => {
    cy.visit("/auth/signin");
    cy.get("button").contains("Login");
    cy.location("pathname").should("equal", "/auth/signin");
  });

  it("should redirect when logged", () => {
    cy.signIn();

    cy.visit("/auth/signin");
    cy.get("button").contains("Login").should("not.exist");
    cy.location("pathname").should("equal", "/");
  });
});

export {};
