const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

let image = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    imageTitle: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: ObjectId }],
    dateC: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Image', image);