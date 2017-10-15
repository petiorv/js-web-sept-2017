const fs = require('fs');

function getContentType(url) {
    let contentTypes = {
        '.css': 'text/css',
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.ico': 'image/x-icon',
        '.jpg': 'image/jpeg',
        '.png': 'image/png',
        '.bin': 'application/octet-stream'
    };

    for (let type in contentTypes) {
        if (url.endsWith(type)) {
            return contentTypes[type];
        }
    }
}

module.exports = (req, res) => {
    fs.readFile('.' + req.pathname, (err, data) => {
        if (err || !req.pathname.startsWith('/content/')) {
            console.log(err);
            res.writeHead(404);
            res.write('404 Not Found');
            res.end();
            return;
        }

        if (req.pathname.endsWith('.css') || req.pathname.endsWith('.html') || req.pathname.endsWith('.ico') ||
            req.pathname.endsWith('.js') || req.pathname.endsWith('.png') || req.pathname.endsWith('.jpg') ||
            req.pathname.endsWith('.bin')) {

            res.writeHead(200, {
                'Content-Type': getContentType(req.pathname)
            });
            res.write(data);
            res.end();
        } else {
            res.writeHead(403);
            res.write('Forbidden!');
            res.end();
        }
    });
};