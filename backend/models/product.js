const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    type: String,
    image: String,
    price: Number,
    calory: Number,
    likes: Number,
    ingredients: [
        {
            type: String
        }
    ],
    alsoLike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ],
    description: String
});

module.exports = mongoose.model('Product', productSchema);