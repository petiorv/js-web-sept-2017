const fs = require('fs');
let db = {};

function isString(key) {
    if (typeof (key) === 'string') {
        return true;
    } else {
        console.log('Key must be string!');
        return false;
    }
}

function isExist(key) {
    if (!db.hasOwnProperty(key)) {
        return true;
    }
}

let put = (key, value) => {
    return new Promise((resolve, reject) => {
        if (!isString(key) && !isExist(key)) {
            reject;
        }
    })
    

}

let get = (key) => {
    if (db.hasOwnProperty(key)) {
        return db[key];
    } else {
        return 'Key does not exist!';
    }
}

let getAll = () => {
    if (Object.values(db).lenght === 0) {
        return 'storage is empty!';
    }
    return db;
}

let update = (key, newValue) => {
    if (isString(key)) {
        db[key] = newValue;
    }
}

let deleteItem = (key) => {
    if (isString(key)) {

    }
}

let clear = () => {
    db = {};
}

let save = () => {
    fs.writeFileSync('./data.json', JSON.stringify(db));
}

let load = (callback) => {
   fs.readFile('./data.json', 'utf8', (err, data) => {
       if(err){
           return
       }
       db = JSON.parse(data);

       callback();
   });
}

module.exports = {
    put: put,
    get: get,
    getAll: getAll,
    update: update,
    delete: deleteItem,
    clear: clear,
    save: save,
    load: load
}