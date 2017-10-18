const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId


let genre = new mongoose.Schema({
    genreName: {type: String, required: true},
    memeList: [{type: ObjectId, red:'Memes'}]
})

module.exports = mongoose.model('Genre',genre)