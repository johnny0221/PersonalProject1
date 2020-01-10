const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    name: String,
    image: String,
    DateStart: Date,
    DateEnd: Date,
    description: String
});

module.exports = mongoose.model('Activity', activitySchema);