import { API, URL_SEARCH_PARAM } from "../../src/consts";

describe("HomePage", () => {
  it("Display list of exchange rates and search for USD currecny.", () => {
    cy.intercept(API.countries).as("restcountries");
    cy.intercept(API.exchangeRates).as("exchangeRates");
    cy.visit("/");
    const currency = "USD";
    const columnsTitle = ["Country", "Currency", "Sell", "Buy"];

    cy.get('[data-cy="exchange-rate-table"]').as("exchangeTable");
    cy.get('[data-cy="page-header"]').as("pageHeader");

    cy.get("@pageHeader").should("be.visible");
    cy.get("@pageHeader").should("contain.text", "George FE test");

    cy.get(".ant-spin-dot").should("be.visible");

    cy.wait(["@restcountries", "@exchangeRates"]).then((interceptions) => {
      interceptions.forEach((interception) =>
        assert.equal(interception.response.statusCode, 200)
      );
    });

    cy.get("@exchangeTable").should("be.visible");
    cy.get("@exchangeTable").find("th").should("have.length", 4);

    columnsTitle.forEach((title) => {
      cy.get("@exchangeTable").find("th").contains(title);
    });

    cy.get('[data-cy="searchbar"]').type(currency);

    cy.get("@exchangeTable").find("tbody>tr").should("have.length", 1);
    cy.get("@exchangeTable").find("tr>td").contains("United States of America");
    cy.url().should("include", `?${URL_SEARCH_PARAM}=${currency}`);
  });

  it("Display error message when request failed.", () => {
    cy.intercept(API.exchangeRates).as("exchangeRates");
    cy.intercept(API.countries, { forceNetworkError: true }).as(
      "restcountries"
    );
    cy.visit("/");

    cy.wait(["@restcountries", "@exchangeRates"]);

    cy.get(".ant-result-title").should("be.visible").should("be.visible");
  });

  it("Open deep link with search parameter and display results.", () => {
    cy.visit("/");
    const country = "Afghanistan";
    cy.get('[data-cy="exchange-rate-table"]').as("exchangeTable");

    cy.visit(`/?search=${country}`);

    cy.get(".ant-spin-dot").should("be.visible");
    cy.get(".ant-spin-dot").should("not.exist");

    cy.get("@exchangeTable").find("tbody>tr").should("have.length", 1);
    cy.get("@exchangeTable").find("tr>td").contains(country);
  });

  it("Display the not found message.", () => {
    cy.visit("/");

    cy.get('[data-cy="exchange-rate-table"]').as("exchangeTable");

    cy.visit("/?search=12345");

    cy.get(".ant-spin-dot").should("be.visible");
    cy.get(".ant-spin-dot").should("not.exist");

    cy.get("@exchangeTable").find(".ant-empty").should("be.visible");
  });
});
