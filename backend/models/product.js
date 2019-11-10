const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, unique: true, required: true },
    type: String,
    price: Number,
    calory: Number,
    Ingredient: [
        {
            type: string
        }
    ],
    alsoLike: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'product'
        }
    ],
    image: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comment'
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);