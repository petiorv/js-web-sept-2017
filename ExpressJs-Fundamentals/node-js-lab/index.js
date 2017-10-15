const http = require('http');
const url = require('url');
const handlers = require('./handlers');
const port =  2525;

http.createServer((req, res)=>{
    req.pathname = req.pathname || url.parse(req.url).pathname;   
    for (let handler of handlers){
        let next = handler(req, res);
        if (!next){
            break;
        }
}
}).listen(port);

console.log(`Listening on ${port}...`);