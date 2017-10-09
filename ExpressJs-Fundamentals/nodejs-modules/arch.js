const fs = require('fs');
const zlib = require('zlib');

//zip
// let readStream = fs.createReadStream('file.txt');
// let writeStream = fs.createWriteStream('file.txt.gz');

// let gzip = zlib.createGzip();
// readStream.pipe(gzip).pipe(writeStream);

//unzip
let readStream = fs.createReadStream('file.txt.gz');
let writeStream = fs.createWriteStream('file.txt');

let unzip = zlib.createGunzip();
readStream.pipe(unzip).pipe(writeStream);


