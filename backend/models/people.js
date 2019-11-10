const mongoose = require('mongoose');

const peopleSchema = mongoose.Schema({
    name: String,
    position: String,
    age: Number,
    image: String,
    text: String
});

module.exports = mongoose.model('People', peopleSchema);