describe("Id Page", () => {
  it("should give 404 error when product is not found", () => {
    const id = 100000000;

    cy.visit("/" + id, { failOnStatusCode: false });
    cy.contains("Page Not Found");

    cy.visit("/en/" + id, { failOnStatusCode: false });
    cy.contains("Page Not Found");

    cy.visit("/pt/" + id, { failOnStatusCode: false });
    cy.contains("Pagina não encontrada");
  });

  // Cannot test when product is found, because the request is made on getServerSideProps.
  // Cypress only support intercept requests made on the browser
});

export {};
