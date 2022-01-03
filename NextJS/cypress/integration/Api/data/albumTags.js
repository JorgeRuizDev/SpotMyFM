/// <reference types="cypress" />

describe("Tag api endpoints", () => {
  let headers = "";
  before(() => {
    cy.getJWT().then(() => {
      const t = Cypress.env("JWT");
      headers = { Authorization: "Bearer " + t };
    });

    cy.log("Headers:");
    cy.log(headers);
  });

  context("Alive Endpoint", () => {
    it("Tests that the endpoint is alive", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",
        headers: headers,
      }).should((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("Tests that the endpoint fails if there is no JWT token", () => {
      cy.request({
        method: "GET",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(403);
      });
    });
  });

  context("POST Endpoint", () => {
    it("Tests Incorrect Body", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",
        headers: headers,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);
      });

      cy.request({
        method: "POST",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",

        headers: headers,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);
      });

      cy.request({
        method: "POST",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",

        headers: headers,
        failOnStatusCode: false,
      }).should((response) => {
        expect(response.status).to.eq(400);
      });
    });

    it("Tests Empty Post Body", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",

        headers: headers,
        failOnStatusCode: false,
        body: {
          albums: [],
        },
      }).should((response) => {
        expect(response.status).to.eq(400);
      });
    });

    it("Tests Correct Post Body", () => {
      cy.request({
        method: "POST",
        url: Cypress.env("base_url") + "api/database/albums/tagAlbums",

        headers: headers,
        body: {
          albums: [{ id: "a", tags: [] }],
        },
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.tags).to.be.a("array");
      });
    });

    context("GET Endpoint", () => {
      it("Tests That the GET Endpoint returns a non-empty array", () => {
        cy.request({
          method: "GET",
          url: Cypress.env("base_url") + "api/database/albums/tagAlbums",

          headers: headers,
        }).should((response) => {
          expect(response.status).to.eq(200);
          const tags = response.body.tags
          expect(response.body.tags).to.be.a("array")
          expect(tags.length).to.be.greaterThan(0)
          expect(tags[0].id).to.exist
          expect(tags[0].tags).to.exist
        });
      });
    });
  });
});
