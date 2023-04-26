let config = {};
let configLocal = {};

/* eslint-disable global-require, no-empty */
if (process.env.TR_ENV === 'prod') {
  config = require(`${__dirname}/config.prod.json`);
} else {
  config = require(`${__dirname}/config.dev.json`);
}

try {
  configLocal = require(`${__dirname}/config.local.json`);
} catch (e) {}

export default {
  ...config,
  ...configLocal,
};
