const fs = require('fs');

function promisify(func) {
    return (...params) => {
        return new Promise((resolve, reject) => {
            func(...params, (err, data) => {
                if(err) console.log(err);
                resolve(data);
            });
        });
    };
}

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

async function copySettings(){
    
    let files = await readdir('./');
    console.log('Found files: ');
    for (let path of files){
        console.log(path);
    } 
    let lastFileName = files[files.length - 1];
    let fileAsString = await readFile('./' + lastFileName, 'utf8');
    let settings = JSON.parse(fileAsString);
    settings.description = "Demo project";
    await mkdir('./copy');
    await writeFile('./copy/package.json', JSON.stringify(settings));
    console.log('Done');
}

copySettings();