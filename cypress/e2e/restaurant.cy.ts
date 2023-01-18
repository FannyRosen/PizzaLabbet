describe("restaurant", () => {
  it("successfully loaded", () => {
    cy.visit("http://localhost:3000/restaurant/id");
  });
});

it("gets restaurants adress and menu", () => {
  cy.visit("http://localhost:3000/restaurant/id");

  cy.request(
    "https://private-anon-0b29b1c60c-pizzaapp.apiary-mock.com/restaurants/id"
  ).then((response) => {
    expect(response.status).to.eq(200);
  });
  cy.request(
    "https://private-anon-0b29b1c60c-pizzaapp.apiary-mock.com/restaurants/id/menu?category=Pizza&orderBy=rank"
  ).then((response) => {
    expect(response.status).to.eq(200);
  });
});

describe("Add to Cart Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/restaurant/id");
  });

  it('adds an item to the cart when clicking on the "Add to Cart" button', () => {
    cy.get("#add-btn").click();
    cy.get("[data-testid=cart-items]").should("contain", "1");
  });
});

describe("Cart Navigation Test", () => {
  beforeEach(() => {
    cy.visit("https://localhost:3000/restaurant/id");
  });

  it("navigates to the cart page when clicking on the cart icon and check the items are still there", () => {
    cy.get("#cart-icon").click();
    cy.url().should("eq", "https://localhost:3000/cart");
    cy.get("[data-testid=cart-items]").should("contain", "1 Item");
  });
});

/* describe("Navigation Test", () => {
  it('navigates to the homepage when clicking on the "Home" link', () => {
    cy.get("[data-testid=home-link]").click();
    cy.url().should("eq", "http://localhost:3000");
  });
}); */
