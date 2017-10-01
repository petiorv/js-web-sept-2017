const http = require('http');
const url = require('url');
const port = 1334;
let storage = require('./storage.js');

http.createServer((req, res) => {
    storage.put('first', 'firstValue');
    storage.put('second', 'secondValue');
    storage.put('third', 'thirdValue');
    storage.put('fouth', 'fourthValue');
    storage.delete('second');
    storage.update('first', 'updatedFirst');
    storage.save();
    storage.clear();
    storage.load(() => {
        console.log(storage.get('first'));
        console.log(storage.getAll());
    });
}).listen(port);