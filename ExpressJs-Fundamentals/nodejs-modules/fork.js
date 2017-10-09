const http = require('http').createServer();
let cluster = require('cluster');
let cpus = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < cpus; i++) {
        console.log('Forking process: ' + i);
        cluster.fork();
    }
} else {
    http.on('request', (req, res) => {
        res.end('Hello');
    });
    http.listen(5000);
}