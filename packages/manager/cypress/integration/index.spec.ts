describe("Admin Panel Page", () => {
  it("should redirect when unauthenticated", () => {
    cy.visit("/");
    cy.location("pathname").should("equal", "/auth/signin");
  });

  it("should load when authenticated", () => {
    cy.signIn();

    cy.visit("/");
    cy.location("pathname").should("equal", "/");

    cy.get("main").find("a").should("have.length", 4);
  });
});

export {};
