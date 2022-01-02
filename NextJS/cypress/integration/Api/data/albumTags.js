/// <reference types="cypress" />

describe("Tag api endpoints", () => {
  let jwt = "";
  let headers = "";
  before(() => {
    cy.getJWT();
    const t = Cypress.env("JWT");
    jwt = t;
    headers = { Authorization: "Bearer " + t };
  });

  context("Test that the Endpoint is alive", () => {
    it("should return a list with all products", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",
        headers: headers,
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
