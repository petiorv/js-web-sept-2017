const url = require('url');
const database = require('./../config/database');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const multiparty = require('multiparty');
const shortid = require('shortid');

module.exports = (req, res) => {
    if (req.pathname === '/product/add' && req.method === 'GET') {
        fs.readFile('./views/products/add.html', (err, data) => {
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
    } else if (req.pathname === '/product/add' && req.method === 'POST') {
        
        let form = new multiparty.Form();
        let product = {};

        form.on('part', (part) => {
            if (part.filename) {
                let dataStr = '';

                part.setEncoding('binary');
                part.on('data', data => {
                    dataStr += data;
                });

                part.on('end', () => {
                    let fileName = shortid.generate();
                    let filePath = `./content/images/${fileName}.bin`;
                    product.image = filePath;
                    fs.writeFile(`${filePath}`, dataStr, { encoding: 'ascii' }, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                });
            } else {
                part.setEncoding('utf-8');
                let field = '';
                part.on('data', (data) => {
                    field += data;
                });

                part.on('end', () => {
                    product[part.name] = field;
                });
            }
        });

        console.log(product);

        form.on('close', () => {
            database.products.add(product);
            res.writeHead(302, {
                Location: '/'
            });
            res.end();
        });

form.parse(req);

    } else {
        return true;
    }
};