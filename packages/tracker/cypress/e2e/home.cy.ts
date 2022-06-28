import generateProduct from "../support/generateProduct";
import testSOCard from "../support/testSOCard";

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

    testSOCard(product);
  });
});

export {};
