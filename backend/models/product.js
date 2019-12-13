const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    type: String,
    imageUrl: String,
    price: Number,
    calory: Number,
    likes: {
        type: Number,
        default: 0
    },
    ingredients: [
        {
            type: String
        }
    ],
    alsoLike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    description: String,
    creator: {
        type: String,
        default: 'admin'
    }
});

module.exports = mongoose.model('Product', productSchema);