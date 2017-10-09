const fs = require('fs');
const database = require('../config/dataBase');

let viewAll = (req, res) => {
  let db = database.getDb();
  fs.readFile('./views/viewAll.html', 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });

    let memes = ``;

    for (let meme of db) {
      memes += `<div class="meme">
                  <a href="/getDetails?id=${meme.id}">
                  <img class="memePoster" src="${meme.memeSrc}"/>          
                </div>`;

    }
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
                      <button><a href="${targetedMeme.posterSrc}">Download Meme</a></button>
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
