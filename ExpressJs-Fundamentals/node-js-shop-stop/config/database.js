const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, '/database.json');

let products =[];
let count = 1;

function getProducts() {
    if (!fs.existsSync('/database.json')) {
        fs.writeFileSync(dbPath, '[]');
        return [];
    }

    let json = fs.readFile(dbPath).toString() || '[]';
    let products = JSON.parse(json);
    return products;
}

function saveProducts (products) {
    let json  = JSON.stringify(products);
    fs.writeFileSync(dbPath, json);
}

module.exports.products = {};

module.exports.products.getAll = getProducts;

module.exports.products.add = (product) => {
    let products = getProducuts();
    product.id = count ++;
    products.push(product);
}

module.exports.products.findByName = (name) => {
    return getProducts().filter(p => p.name.toLowerCase().includes(name));
}