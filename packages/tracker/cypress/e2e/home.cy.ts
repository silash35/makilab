import generateProduct from "../support/generateProduct";

describe("Home Page", () => {
  it("should load", () => {
    cy.visit("");
    cy.contains("Check your product status");

    cy.visit("/en");
    cy.contains("Check your product status");

    cy.visit("/pt");
    cy.contains("Verifique o status do seu produto");
  });

  it("should search", () => {
    cy.visit("");

    const product = generateProduct();
    cy.intercept("POST", "/api/public/search", {
      statusCode: 200,
      body: product,
    });

    cy.get("input").click();
    cy.get("input").type(product.id + "{enter}");
    cy.contains(`SO ${product.id}: ${product.name}`);
    cy.contains("Budgeting");
    cy.contains("Waiting for parts");

    if (product.isUnderWarranty) {
      cy.contains("Waiting for budget approval").should("not.exist");
    } else {
      cy.contains("Waiting for budget approval");
    }
  });
});

export {};
