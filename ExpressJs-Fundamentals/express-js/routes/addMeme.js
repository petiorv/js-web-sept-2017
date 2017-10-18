var express = require('express');
var router = express.Router();


let Genre = require('./../models/GenreScheme')
let Meme = require('./../models/MemeScheme')

let renderPage = (res, success, hasError, errorMsg) => {
  let tags = []
  Genre.find({}).then(foundGenres => {
    for (let genre of foundGenres) {
      tags.push(genre)
    }
  }).then(result => {
    res.render('addMeme', { tags, isUploaded: success, gotError: hasError, errorMsg: errorMsg })
  })
}

let validateEntry = (req,res)=>{
  if (req.files == null) {
    renderPage(res, false, true, "Make sure you upload your meme")
    return -1
  }
  if (req.body.memeTitle.length < 3) {
    renderPage(res, false, true, "Your meme title must be at least 3 symbols long")
    return -1
  }
  if (req.body.memeDescription.length < 3) {
    renderPage(res, false, true, "Your meme description must be at least 3 symbols long")
    return -1
  }
  if (req.body.genreSelect === '-1') {
    renderPage(res, false, true, "Please select a genre from the dropdown menu")
    return -1
  }
  return 0
}
/* GET users listing. */
router
  .get('/', function (req, res, next) {
    renderPage(res)
  })
  .post('/', (req, res, next) => {

    if (validateEntry(req,res) == -1){
      return
    }

    let file = req.files.meme
    let memeObj = req.body
    let newMemePath = `./public/memes/${file.name}`

    file.mv(newMemePath, (err) => {
      if (err) {
        console.log(err)
        return
      }
    })

    Meme.create({
      memeTitle: memeObj.memeTitle,
      memeDescription: memeObj.memeDescription,
      memePath: newMemePath.replace('./public', '')
    })
      .then(newMeme => {
        let targetGenre = memeObj.genreSelect
        let memeId = newMeme._id
        console.log(targetGenre)
        Genre.findOne({ genreName: targetGenre })
          .then(foundGenre => {
            console.log(foundGenre)
            foundGenre.memeList.push(memeId)
            foundGenre.save().then(() => {
              renderPage(res, true)
            })
          })
      })
  })


module.exports = router;
