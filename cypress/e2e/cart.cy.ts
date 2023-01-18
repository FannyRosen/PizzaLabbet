/* describe("Add to Cart Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/restaurant/id");
  });

  it('adds an item to the cart when clicking on the "Add to Cart" button', () => {
    cy.get("#add-btn").click();
    cy.get("[data-testid=cart-items]").should("contain", "1");
  });
}); */

describe("cart", () => {
  it("successfully loaded", () => {
    cy.visit("http://localhost:3000/cart");
  });
});
