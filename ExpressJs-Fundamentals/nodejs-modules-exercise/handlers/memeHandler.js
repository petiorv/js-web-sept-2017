const fs = require('fs');
const database = require('../config/dataBase');
const formidable = require('formidable');
const shortId = require('shortid');

let viewAll = (req, res) => {
  let db = database.getDb();
  fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let memes = ``;

    db = db.sort((a, b) => {
      return b.dateStamp - a.dateStamp;
    }).filter((currentMeme) => {
      return currentMeme.privacy === 'on';
    });
    for (let meme of db) {
      memes += `<div class="meme">
                  <a href="/getDetails?id=${meme.id}">
                  <img class="memePoster" src="${meme.memeSrc}"/>          
                </div>`;

    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memes);
    res.write(data);
    res.end();
  });
};

let viewAddMeme = (req, res) => {
  fs.readFile('./views' + req.pathname + '.html', 'utf8', (err, data) => {
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
};

let viewAddMemeError = (req, res) => {
  fs.readFile('./views' + req.pathname + '.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="errBox"><h2 id="errMsg">Please fill all fields</h2></div>');
    res.write(data);
    res.end();
  });
};

let viewAddMemeSuccess = (req, res) => {
  fs.readFile('./views' + req.pathname + '.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', '<div id="succssesBox"><h2 id="succssesMsg">Meme Added</h2></div>');
    res.write(data);
    res.end();
  });
};

let memeGenerator = (id, title, memeSrc, description, privacy) => {
  return {
    id: id,
    title: title,
    memeSrc: memeSrc,
    description: description,
    privacy: privacy,
    dateStamp: Date.now()
  };

};
let addMeme = (req, res) => {
  let form = new formidable.IncomingForm();
  let fileName = shortId.generate();
  let dbLength = Math.ceil(database.getDb().length / 10);
  let fullPath = `./public/memeStorage/${dbLength}/${fileName}.jpg`;
  form
    .on('error', (err) => {
      console.log(err);
    })
    .on('fileBegin', (name, file) => {
      let memePath = `./public/memeStorage/${dbLength}`;

      fs.access(memePath, err => {
        if (err) {
          fs.mkdirSync(memePath);
        }
      });
      file.path = memePath + `/${fileName}.jpg`;
    });

  form.parse(req, function (err, fields, files) {
    if (fields.memeDescription.length > 0 && fields.memeTitle.length > 0 && files.meme.size > 0) {
      let id = shortId.generate();
      let createMeme = memeGenerator(id, fields.memeTitle, fullPath, fields.memeDescription, fields.status);
      database.add(createMeme);
      database.save();
      viewAddMemeSuccess(req, res);
    } else {
      viewAddMemeError(req, res);
    }
  });
};

let getDetails = (req, res) => {
  let id = req.url.split('=');
  fs.readFile('./views/details.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    let targetedMeme = database.getMeme(id[1]);
    let memeHtml = `<div class="content">
                      <img src="${targetedMeme.memeSrc}" alt=""/>
                      <h3>Title  ${targetedMeme.title}</h3>
                      <p> ${targetedMeme.description}</p>
                      <a href="${targetedMeme.memeSrc}" download><button>Download Meme</button></a>
                    </div>`;    

    data = data.toString().replace('<div id="replaceMe">{{replaceMe}}</div>', memeHtml);
    res.write(data);
    res.end();
  });
};


module.exports = (req, res) => {
  if (req.pathname === '/viewAllMemes' && req.method === 'GET') {
    viewAll(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'GET') {
    viewAddMeme(req, res);
  } else if (req.pathname === '/addMeme' && req.method === 'POST') {
    addMeme(req, res);
  } else if (req.pathname.startsWith('/getDetails') && req.method === 'GET') {
    getDetails(req, res);
  } else {
    return true;
  }
};