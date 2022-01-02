/// <reference types="cypress" />

describe("Auto Login Test", () => {
  beforeEach(() => {
    cy.setCookie("SPOTIFY_REFRESH", Cypress.env("spotify_refresh_token_e2e"));
    cy.visit(Cypress.env("base_url"));
  });

  it("It changes the current cards", () => {
    cy.contains("Long Term (Since the beginning)").click();
    cy.contains("Add to Playlist", { timeout: 20000 });
  });
});
