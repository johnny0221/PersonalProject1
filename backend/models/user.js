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
            productId: String,
            name: String,
            price: Number,
            quantity: Number,
            imageUrl: String
        }
    ],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
});

module.exports = mongoose.model("User", userSchema);