const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

//
let meme = new mongoose.Schema({
    memeTitle: {type: String, required: true},
    memeDescription: {type: String},
    dateOfCreation: {type: Date, default: Date.now()},
    memePath: {type: String, default: "sad"}
})

module.exports = mongoose.model('Meme',meme)