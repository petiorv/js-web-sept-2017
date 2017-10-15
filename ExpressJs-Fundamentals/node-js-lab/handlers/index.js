const homeHandler = require('./home');
const productsHandler = require('./product');
const filesHandler = require('./static-files');

module.exports = [homeHandler, productsHandler, filesHandler];