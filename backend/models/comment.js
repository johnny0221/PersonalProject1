const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdBy: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    text: String
});

module.exports = mongoose.model('Comment', commentSchema);