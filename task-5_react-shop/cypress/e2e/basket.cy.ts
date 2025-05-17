describe("basket navigation", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("[data-testid='product-card']").should("be.visible");
    });

    it("should navigate to basket page when clicking basket icon", () => {
        cy.get("[data-testid='basket-container']").should("be.visible").click();
        cy.url().should("include", "/basket");
        cy.contains("b", "Basket").should("be.visible");
    });

    it("should navigate to home page when clicking logo", () => {
        cy.get("[data-testid='basket-container']").should("be.visible").click();

        cy.get("[data-testid='navbar-header']").should("be.visible").click();
        cy.url().should("not.include", "/basket");
        cy.get("[data-testid='products-header']").should("be.visible");
        cy.get("[data-testid='product-card']").should("be.visible");
    });

    it("should navigate to checkout page when at least one item is in basket and checkout button is clicked", () => {
        cy.get("[data-testid='add-to-cart-button']")
            .should("be.visible")
            .first()
            .click();
        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='checkout-button']").click();
        cy.url().should("include", "/checkout");
    });
});

describe("basket items", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("[data-testid='product-card']").should("be.visible");
    });

    it("should display basket header", () => {
        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='basket-header']").should("be.visible");
    });

    it("should display total price equal to 0 if basket is empty", () => {
        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='basket-total']").should("have.text", "Total price: $0");
    });

    it("should display basket empty message if basket is empty", () => {
        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='basket-empty']").should("be.visible");
    });

    it("should not display checkout button if basket is empty", () => {
        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='checkout-button']").should("not.exist");
    });

    it("should remove item from basket when clicking - sign and quantity is 1", () => {
        cy.get("[data-testid='add-to-cart-button']")
            .should("be.visible")
            .first()
            .click();
        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='basket-item']").first().find("[data-testid='decrease-quantity']").click();
        cy.get("[data-testid='basket-item']").should("not.exist");
    });

    it("should display checkout button if basket is not empty and have pointer cursor", () => {
        cy.get("[data-testid='add-to-cart-button']")
            .should("be.visible")
            .first()
            .click();
        cy.get("[data-testid='basket-container']")
            .should("be.visible")
            .click();
        cy.get("[data-testid='checkout-button']").should("be.visible");
        cy.get("[data-testid='checkout-button']").should("have.css", "cursor", "pointer");
    });

    it("should contain at least one basket item after adding product", () => {
        cy.get("[data-testid='add-to-cart-button']")
            .should("be.visible")
            .first()
            .click();
        cy.get("[data-testid='basket-container']")
            .should("be.visible")
            .click();
        cy.get("[data-testid='basket-item']").should("have.length.at.least", 1);
    });

    it("should display correct item name in basket after adding from home page", () => {
        cy.get("[data-testid='product-card']")
            .first()
            .find("[data-testid='product-title']")
            .invoke('text')
            .then((productName) => {
                cy.get("[data-testid='add-to-cart-button']")
                    .first()
                    .click();

                cy.get("[data-testid='basket-container']")
                    .click();

                cy.get("[data-testid='basket-item']")
                    .should('contain', productName);
            });
    });

    it("should double the price when adding the same item twice", () => {
        cy.get("[data-testid='product-card']")
            .first()
            .find("[data-testid='product-price']")
            .invoke('text')
            .then((priceText) => {
                const initialPrice = parseFloat(priceText.replace('$', ''));
                cy.log('Initial price: ' + initialPrice);

                cy.get("[data-testid='add-to-cart-button']")
                    .first()
                    .click()
                    .click();

                cy.get("[data-testid='basket-container']").click();

                cy.get("[data-testid='basket-total']")
                    .invoke('text')
                    .then((totalText) => {
                        cy.log('Total price text: ' + totalText);
                        const priceMatch = totalText.match(/\$(\d+(\.\d+)?)/);
                        const totalPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                        expect(totalPrice).to.equal(initialPrice * 2);
                    });
            });
    });

    it("should increase quantity and total price when clicking + button", () => {
        cy.get("[data-testid='product-card']")
            .first()
            .find("[data-testid='product-price']")
            .invoke('text')
            .then((priceText) => {
                const initialPrice = parseFloat(priceText.replace('$', ''));
                cy.log('Initial price: ' + initialPrice);

                cy.get("[data-testid='add-to-cart-button']")
                    .first()
                    .click();

                cy.get("[data-testid='basket-container']").click();

                cy.get("[data-testid='basket-item']")
                    .first()
                    .find("[data-testid='item-quantity']")
                    .invoke('text')
                    .then((quantityText) => {
                        const initialQuantity = parseInt(quantityText);
                        cy.log('Initial quantity: ' + initialQuantity);

                        cy.get("[data-testid='basket-item']")
                            .first()
                            .find("[data-testid='increase-quantity']")
                            .click();

                        cy.get("[data-testid='basket-item']")
                            .first()
                            .find("[data-testid='item-quantity']")
                            .should('contain', initialQuantity + 1);

                        cy.get("[data-testid='basket-total']")
                            .invoke('text')
                            .then((totalText) => {
                                cy.log('Total price text: ' + totalText);
                                const priceMatch = totalText.match(/\$(\d+(\.\d+)?)/);
                                const totalPrice = priceMatch ? parseFloat(priceMatch[1]) : 0;
                                expect(totalPrice).to.equal(initialPrice * (initialQuantity + 1));
                            });
                    });
            });
    });

});


describe("basket badge", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.get("[data-testid='product-card']").should("be.visible");
    });

    it("should be hidden when basket is empty", () => {
        cy.get("[data-testid='basket-badge']").should("not.exist");
    });

    it("should increase when adding products", () => {
        cy.get("[data-testid='add-to-cart-button']").first().click();
        cy.get("[data-testid='basket-badge']").should("have.text", "1");
    });

    it("should adding the same product twice should not increase the badge", () => {
        cy.get("[data-testid='add-to-cart-button']").first().click();
        cy.get("[data-testid='add-to-cart-button']").first().click();
        cy.get("[data-testid='basket-badge']").should("have.text", "1");
    });
})