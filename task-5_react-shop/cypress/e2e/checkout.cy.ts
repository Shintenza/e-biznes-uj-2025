describe("presentation", () => {
    beforeEach(() => {
        cy.visit("/checkout");
    });

    it("should display checkout page", () => {
        cy.get("[data-testid='checkout-container']").should("be.visible");
    });

    it("should display checkout container", () => {
        cy.get("[data-testid='checkout-header']").should("be.visible");
    });

    it("should display total amount to pay", () => {
        cy.get("[data-testid='total-amount-to-pay']").should("be.visible");
    });

    it("should display pay button", () => {
        cy.get("[data-testid='pay-button']").should("be.visible");
    });

    it("should display cursor pointer on pay button", () => {
        cy.get("[data-testid='pay-button']").should("have.css", "cursor", "pointer");
    });

})

const findDivWithLabelAndInput = (labelText: string) => {
  return cy.get('div[data-scope="field"][data-part="root"]').then(($divs) => {
    const match = [...$divs].find((el) => {
      const firstChild = el.firstElementChild;
      const hasCorrectLabel = firstChild?.tagName.toLowerCase() === 'label' &&
                              firstChild?.textContent?.trim() === labelText;
      const containsInput = el.querySelector('input') !== null;
      return hasCorrectLabel && containsInput;
    });

    if (!match) {
      throw new Error(`form element with label: "${labelText}" not found.`);
    }

    return cy.wrap(match);
  });
};

const fillFormWithUserData = (data: any)=>{
    const input = findDivWithLabelAndInput("First name").find("input");
    input.type(data.firstName);
    const input2 = findDivWithLabelAndInput("Last name").find("input");
    input2.type(data.lastName);
    const input3 = findDivWithLabelAndInput("Email").find("input");
    input3.type(data.email);
}

const performSuccessfulPayment = ()=>{
    cy.visit("/");
    cy.get("[data-testid='product-card']").first().within(() => {
        cy.get("[data-testid='buy-now-button']").click();
    });
    cy.fixture("user.json").then((data) => {
        fillFormWithUserData(data);
    });
    cy.get("[data-testid='pay-button']").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
}

describe("form", () => {
    beforeEach(() => {
        cy.visit("/checkout");
    });

    it("should display first name input", () => {
        findDivWithLabelAndInput("First name").should("be.visible");
    });

    it("should display last name input", () => {
        findDivWithLabelAndInput("Last name").should("be.visible");
    });

    it("should display email input", () => {
        findDivWithLabelAndInput("Email").should("be.visible");
    });

    it("should display error message when first name input is empty and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("First name").find("span[data-part='error-text']").should("be.visible");
    });

    it("should display error message when last name input is empty and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("Last name").find("span[data-part='error-text']").should("be.visible");
    });

    it("should display error message when email input is empty and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("Email").find("span[data-part='error-text']").should("be.visible");
    });

    it("should display error message when email input is not valid and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("Email").find("span[data-part='error-text']").should("be.visible");
    });

    it("should display error message when first name input is not valid and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("First name").find("span[data-part='error-text']").should("be.visible");
    });

    it("should display error message when first name input is not valid and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        const input = findDivWithLabelAndInput("First name").find("input");
        input.type("John123");
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("First name").find("span[data-part='error-text']").should("be.visible");
    });

    it("should display error messeage when email input is not valid and pay button is clicked", () => {
        cy.get("[data-testid='pay-button']").click();
        const input = findDivWithLabelAndInput("Email").find("input");
        input.type("invalid-email");
        cy.get("[data-testid='pay-button']").click();
        findDivWithLabelAndInput("Email").find("span[data-part='error-text']").should("be.visible");
    });

    it("should checkout with correct data", () => {
        performSuccessfulPayment();
    });

    it("basket is empty after successful payment", () => {
        performSuccessfulPayment();
        cy.get("[data-testid='basket-badge']").should("not.exist");
    });
})

const getPriceFromText = (text: string) => {
    const priceMatch = text.match(/\$(\d+(\.\d+)?)/);
    return priceMatch ? parseFloat(priceMatch[1]) : 0;
}

describe("payment", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should allow checkout after clicking buy now button", () => {
        cy.get("[data-testid='product-card']").first().within(() => {
            cy.get("[data-testid='buy-now-button']").click();
            cy.url().should("include", "/checkout");
        });
        performSuccessfulPayment();

    });

    it("should display the same total price on basket page and checkout page", () => {
        let basketPrice: number;

        cy.get("[data-testid='product-card']").first().within(() => {
            cy.get("[data-testid='add-to-cart-button']").click();
        });

        cy.get("[data-testid='basket-container']").click();
        cy.get("[data-testid='basket-total']").invoke('text').then((text) => {
            basketPrice = getPriceFromText(text);
        });

        cy.get("[data-testid='checkout-button']").click();

        cy.get("[data-testid='total-amount-to-pay']").invoke('text').should((checkoutPrice) => {
            const parsedCheckoutPrice = getPriceFromText(checkoutPrice);
            expect(parsedCheckoutPrice).to.equal(basketPrice);
        });
    });

    it("should display error message when basket is empty and pay button is clicked", () => {
        cy.visit("/checkout");
        cy.fixture("user.json").then((data) => {
            fillFormWithUserData(data);
        });
        cy.get("[data-testid='pay-button']").click();
        cy.contains("Basket is empty").should("be.visible");
    });

})