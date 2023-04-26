const browser = require('detect-browser');

export const browserName = () => browser && browser.name;
