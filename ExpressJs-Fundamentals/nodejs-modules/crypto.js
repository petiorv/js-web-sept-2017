const crypto = require('crypto');

let salt = crypto.randomBytes(128);
let pwd = '123456';
let hmac = crypto.createHmac('sha256', salt);
let hpwd = hmac.update(pwd).digest('hex');
console.log(hpwd);