var express = require('express');
var router = express.Router();


let Genre = require('./../models/GenreScheme')
let Meme = require('./../models/MemeScheme')

/* GET home page. */
router.get('/', function(req, res, next) {

  Genre.find({}).then(foundGenres => {
    let tags = []

    for (let genre of foundGenres) {
      tags.push(genre)
    }
    res.render('searchMeme', { tags })
  })
});

module.exports = router;
