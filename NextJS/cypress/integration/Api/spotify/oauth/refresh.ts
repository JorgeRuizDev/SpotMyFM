describe("Tries to refresh a login token", () => {
  it("Valid Refresh", () => {
    const refreshToken = Cypress.env("spotify_refresh_token_e2e");

    cy.request("POST", Cypress.env("base_url") + "api/spotify/oauth2/refresh", {
      refreshToken,
    }).should((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.token).to.be.a("string");
      expect(res.body.token.length).to.be.greaterThan(10);
      expect(res.body.access_token).to.be.a("string");
      expect(res.body.access_token.length).to.be.greaterThan(10);
    });
  });
});
