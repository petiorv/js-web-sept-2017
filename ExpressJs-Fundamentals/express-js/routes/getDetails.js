var express = require('express');
var router = express.Router();

let Genre = require('./../models/GenreScheme')
let Meme = require('./../models/MemeScheme')


/* GET users listing. */
router.get('/', function (req, res, next) {
  let searchedId = req.query.id

  Meme.findOne({_id: searchedId}).then(foundMeme=>{
      console.log(foundMeme)
      res.render('getDetails',{foundMeme})
  })

});

module.exports = router;
