const homeHandler = require('./home');
const filesHandler = require('./static-files');
const productHandler = require('./product');

module.exports = [ homeHandler, productHandler, filesHandler ];