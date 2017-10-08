const homeHandler = require('./homeHandler');
const staticHandler = require('./static-files');
const movieHandler = require('./movieHandler');

module.exports = [ homeHandler, movieHandler, staticHandler ];
