/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// Load the env variables:
require("dotenv").config({ path: `.env.local` });

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  config.env.spotify_refresh_token = process.env.TEST_SPOTIFY_REFRESH;
  config.env.spotify_refresh_token_e2e = process.env.TEST_SPOTIFY_REFRESH_E2E;
  config.env.base_url = process.env.TEST_BASE_URL;
  return config;
};
