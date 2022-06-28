describe("Home Page", () => {
  it("should load", () => {
    cy.visit("");
    cy.contains("Check your product status");

    cy.visit("/en");
    cy.contains("Check your product status");

    cy.visit("/pt");
    cy.contains("Verifique o status do seu produto");
  });
});

export {};
