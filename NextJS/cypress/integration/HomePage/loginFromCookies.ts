describe("My First Test", () => {
  beforeEach(() => {
    cy.setCookie("SPOTIFY_REFRESH", Cypress.env("spotify_refresh_token"));
    cy.visit(Cypress.env("base_url"));
  });

  it("Does not do much!", () => {
    cy.contains("Long Term (Since the beginning)").click();
    cy.contains("Add to Playlist");
    expect(true).to.equal(true);
  });
});
