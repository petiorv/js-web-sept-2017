const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const port = 3000;

http.createServer((req, res) => {

    for (let handler of handlers) {
        let response = handler(req, res);
        if (response !== true) {
            break
        }
    }

}).listen(port);

console.log(`listen on port: ${port}`)