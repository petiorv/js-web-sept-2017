var express = require('express');
const router = express.Router();
const Genre = require('./../models/GenreScheme')

/* GET users listing. */
router
    .get('/', function (req, res, next) {
        res.render('addGenre', {
            title: "Express",
            name: "asd"
        })
    })
    .post('/', (req, res, next) => {
        console.log(req.body)
        Genre.create(req.body).then((obj)=>{
            console.log(obj)
            res.render('addGenre',{
                isUploaded: true
            })
        }).catch(()=>{
            res.render('addGenre',{
                isUploaded: false
            })
        })
    })

module.exports = router;
