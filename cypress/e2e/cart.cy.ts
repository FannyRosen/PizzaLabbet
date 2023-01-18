describe("Cart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/restaurant/id");
  });

  it("Tests full function of cart", () => {
    cy.get("#add-btn").click();
    cy.get("[data-testid=cart-items]").should("contain", "1");
    cy.get("[data-testid=cart]").click();
    cy.url().should("eq", "http://localhost:3000/cart");
    cy.get("[data-testid=cart-items]").should("contain", "1");
    cy.get("[data-testid=increase]").click();
    cy.get("[data-testid=qty]").should("contain", "2");
    cy.get("[data-testid=decrease]").click();
    cy.get("[data-testid=qty]").should("contain", "1");
    cy.get("[data-testid=place-order]").click();
  });
});
