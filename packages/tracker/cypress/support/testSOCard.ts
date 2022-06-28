export default (product) => {
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
};
