import "cypress-localstorage-commands";

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("login", () => {
  cy.setCookie("SPOTIFY_REFRESH", Cypress.env("spotify_refresh_token_e2e"));
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
/*
function getJWT() {
  return cy.wrap(async () => {
    const refreshToken = Cypress.env("spotify_refresh_token_e2e");

    const response = await cy.request(
      "POST",
      Cypress.env("base_url") + "api/spotify/oauth2/refresh",
      {
        refreshToken,
      }
    );

    const token = response.body.token;
    expect(token).to.be.a("string");
    expect(token.length).to.be.greaterThan(10);
    cy.setLocalStorage("JWT", token);
  });
}*/

function getJWT() {
  const refreshToken = Cypress.env("spotify_refresh_token_e2e");

  return cy.request("POST", Cypress.env("base_url") + "api/spotify/oauth2/refresh", {
    refreshToken,
  }).then((response) => {
    const token = response.body.token;
    expect(token).to.be.a("string");
    expect(token.length).to.be.greaterThan(10);
    Cypress.env("JWT", token);
    cy.log(token);
    cy.setLocalStorage("JWT", token);
  });
}
Cypress.Commands.add("getJWT", getJWT);
