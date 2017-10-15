const fs = require('fs');
const Tag = require('../models/TagSchema')
const Image = require('../models/ImageSchema')

let loadHtml = (res, images) => {
  console.log(images)
  fs.readFile('views/results.html', (err, html) => {
    if (err) {
      console.log(err);
      return
    }
    let resultString = '';
    for (let singleImage of images) {
      resultString += `<fieldset id => <legend>${singleImage.imageTitle}:</legend> 
                       <img src="${singleImage.imageUrl}">
                       </img><p>${singleImage.description}<p/>
                       <button onclick='location.href="/delete?id=${singleImage._id}"'class='deleteBtn'>Delete
                       </button> 
                       </fieldset>`
    }
    html = html.toString()
      .replace("<div class='replaceMe'></div>", resultString);

    // res.writeHead(200, {
    //   'Content-Type': 'text/html'
    // });
    res.write(html);
    res.end();
  });
}

module.exports = (req, res) => {
  if (req.pathname === '/search') {

    Image.find({}).then((images) => {
      loadHtml(res, images);
    }).catch((err) => {
      console.log(err);
      return;
    });

  } else {
    return true;
  }
}
