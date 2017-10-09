const server = require('http').createServer();
const fs = require('fs');


server.on('request', (req, res) => {
    const src = fs.createReadStream('file.txt');

    src.on('data', data => {
        res.write(data);
    });
    src.on('end', () => res.end());

    // fs.readFile('file.txt', (err, data) => {
    //     res.end(data);
    // });

});

server.listen(5000);