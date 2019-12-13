const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    name: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    description: String
});

module.exports = mongoose.model('Activity', activitySchema);