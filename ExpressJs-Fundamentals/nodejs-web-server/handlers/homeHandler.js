const fs = require('fs');
const url = require('url');
const filePath = './views/home.html';

let loadHomePage = ((req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.write(data);
        res.end();

    });
});

module.exports = ((req, res) => {

    req.pathname = req.pathname || url.parse(req.url).pathname;

    if (req.pathname === '/' && req.method === 'GET') {
        loadHomePage(req, res);
    } else {
        return true;
    }
});