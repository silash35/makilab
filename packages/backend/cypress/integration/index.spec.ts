describe("Home Page", () => {
  it("should load even if unauthenticated", () => {
    cy.visit("/");
    cy.contains("This is a backend of OpenSOM. The APIs are available at /api");
  });
});

export {};
