const fs = require('fs');
const database = require('./../config/database');
const qs = require('querystring');
const url = require('url');

module.exports = (req, res) => {
    if (req.pathname === '/' && req.method === 'GET') {
        fs.readFile('views/home/index.html', (err, data) => {

            let products = database.products.getAll();
            let qsData = qs.parse(url.parse(req.url).query);
            let content = '';

            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.write('404 Not Found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            if (qsData.query) {
                products = products.filter(p => p.name.toLowerCase() === qsData.query.toString().toLowerCase());
            }

            for (let product of products) {
                content += `<div class="product-card">
                                <img class="product-img" src="${product.image}">
                                <h2>${product.name}</h2>
                                <p>${product.description}</p>
                            </div>`;
            }
            
            let html = data.toString().replace('{content}', content);
            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};