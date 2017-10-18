var express = require('express');
var router = express.Router();

let Genre = require('./../models/GenreScheme')
let Meme = require('./../models/MemeScheme')



router.get('/', function (req, res) {
  let searchedTitle = req.query.memeTitle
  let searchedGenre = req.query.genreSelect
  let memesToShow = []

  if (searchedGenre === 'All') {
    if (searchedTitle !== "") {
      Meme.findOne({ memeTitle: searchedTitle }).then(foundMeme => {
        memesToShow.push(foundMeme)
      })
      res.render('searchResults', { memesToShow })
    } else {
      Meme.find({}).then(foundMemes => {
        memesToShow = foundMemes
      }).then(foundMemes => {
        res.render('searchResults', { memesToShow })
      })
    }
  }

  else {
    Genre.findOne({ genreName: searchedGenre }).then(foundGenres => {
      for (let meme of foundGenres.memeList) {
        Meme.findOne({ _id: meme }).then(foundMeme => {
          if (foundMeme.memeTitle === searchedTitle || searchedTitle === "") {
            memesToShow.push(foundMeme)
          }
        }).then(result => {
          console.log(memesToShow)
          if (memesToShow.length > 0) {
            res.render('searchResults', { memesToShow })
          } else {
            res.render('searchResults')
          }
        })
      }
    })

  }
})

module.exports = router;
