import { easing } from "cypress/types/jquery";

describe("homepage", () => {
  it("successfully loaded", () => {
    cy.visit("http://localhost:3000");
  });
});

it("gets all restaurants", () => {
  cy.visit("http://localhost:3000");

  cy.request(
    "https://private-anon-0b29b1c60c-pizzaapp.apiary-mock.com/restaurants/"
  ).then((response) => {
    expect(response.status).to.eq(200);
  });
});

it("should respond to a click", () => {
  cy.visit("http://localhost:3000");
  cy.get('[data-testid="btn"]', { timeout: 8000 }).then(($btn) => {
    if ($btn.length) {
      cy.get('[data-testid="btn"]').eq(0).click();
    }
  });
});
