const formidable = require('formidable');
const Image = require('../models/ImageSchema');
const Tag = require('../models/TagSchema');
const fs = require('fs');

let badPractices = (res) => {
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    res.writeHead(200, {
      'Content-Type': 'text/html'
    })
    let dispalyTags = ''

    Tag.find({}).then(tags => {
      for (let tag of tags) {
        dispalyTags += `<div class='tag' id="${tag._id}">${tag.tagName}</div>`
      }
      data = data
        .toString()
        .replace(`<div class='replaceMe'></div>`, dispalyTags)
      res.end(data)
    })
  })
};

let addImage = (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      return;
    }
    fields.tags = fields.tagsID.split(',');
    fields.tags.pop();
    delete fields.tagsID
    Image.create(fields).then(img => {
      let targetedTags = img.tags;

      Tag.update(
        { _id: { $in: targetedTags } },
        { $push: { images: img._id } },
        {multi: true}
      ).then((resol) =>{
        ///console.log(resol);
        badPractices(res);
      })
    }).catch((e) => {
      //console.log(e);
      return;
    })
  });
};
module.exports = (req, res) => {
  if (req.pathname === '/addImage' && req.method === 'POST') {
    addImage(req, res)
  } else if (req.pathname === '/delete' && req.method === 'GET') {
    deleteImg(req, res)
  } else {
    return true
  }
}
