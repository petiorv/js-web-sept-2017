const fs = require('fs');
const url = require('url');
const filePath = './public/images/favicon.ico';

function fileType(dataString) {
    let dataTypes = {
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.ico': 'image/x-icon'
    };

    for (let type in dataTypes) {
        if (dataString.endsWith(type)) {
            return dataTypes[type];
        }
    }
}

function loadFavIcon(req, res) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': fileType(req.pathname)
        });

        res.write(data);
        res.end();
    });
}

function loadCss(req, res) {
    fs.readFile('.' + req.pathname, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        res.writeHead(200, {
            'Content-Type': fileType(req.pathname)
        });
        res.write(data);
        res.end();

    });
}

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;
    if (req.pathname === '/favicon.ico' && req.method === 'GET') {
        loadFavIcon(req, res);
    } else if (req.pathname.startsWith('/public/') && req.method === 'GET') {
        loadCss(req, res);
    } else {
        res.write('404');
        res.end();
    }
};