var express = require('express');
var router = express.Router();

let Genre = require('./../models/GenreScheme')
let Meme = require('./../models/MemeScheme')


/* GET users listing. */
router.get('/', function(req, res, next) {
  Meme.find({}).then(foundMemes => {
    let memesToShow = []

    for (let meme of foundMemes) {
      memesToShow.push(meme)
    }
    console.log(memesToShow)
    res.render('viewAll', {memesToShow})
  })
});

module.exports = router;
