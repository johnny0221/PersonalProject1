const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: String,
    email: String,
    likedproducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

module.exports = mongoose.model("User", userSchema);