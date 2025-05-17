describe("valid home presence", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows the navbar", () => {
    cy.get("[data-testid='navbar-header']").should("exist");
  });

  it("shows the products header", () => {
    cy.get("[data-testid='products-header']").should("exist");
  });

  it("navbar header changes cursor to pointer on hover", () => {
    cy.get("[data-testid='navbar-header']")
      .should("have.css", "cursor", "pointer");
  });

  it("basket icon changes cursor to pointer on hover", () => {
    cy.get("[data-testid='basket-container']")
      .should("have.css", "cursor", "pointer");
  });

  it("shows the products", () => {
    cy.get("[data-testid='product-card']").should("exist");
  });
});

describe("product card", () => {
  beforeEach(() => {
    cy.visit("/");
  });


  it("each product card has Buy now button", () => {
    cy.get("[data-testid='product-card']").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get("[data-testid='buy-now-button']")
          .should("exist")
          .and("contain.text", "Buy now");
      });
    });
  });

  it("Buy now button has pointer cursor", () => {
    cy.get("[data-testid='product-card']").first().within(() => {
      cy.get("[data-testid='buy-now-button']")
        .should("have.css", "cursor", "pointer");
    });
  });

  it("each product card has Add to cart button", () => {
    cy.get("[data-testid='product-card']").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get("[data-testid='add-to-cart-button']")
          .should("exist")
          .and("contain.text", "Add to cart");
      });
    });
  });

  it("Add to cart button has pointer cursor", () => {
    cy.get("[data-testid='product-card']").first().within(() => {
      cy.get("[data-testid='add-to-cart-button']")
        .should("have.css", "cursor", "pointer");
    });
  });

  it("each product card displays a title", () => {
    cy.get("[data-testid='product-card']").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get("[data-testid='product-title']")
          .should("exist")
          .and("not.be.empty");
      });
    });
  });

  it("each product card displays a price", () => {
    cy.get("[data-testid='product-card']").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get("[data-testid='product-price']")
          .should("exist")
          .and("contain", "$")
      });
    });
  });

  it("each product card displays a description", () => {
    cy.get("[data-testid='product-card']").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get("[data-testid='product-description']")
          .should("exist")
          .and("not.be.empty");
      });
    });
  });

  it("each product card displays an image", () => {
    cy.get("[data-testid='product-card']").each(($card) => {
      cy.wrap($card).within(() => {
        cy.get("[data-testid='product-image']")
          .should("exist")
          .and("have.attr", "src")
          .and("not.be.empty");
      });
    });
  });
});