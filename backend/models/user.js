const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    password: String,
    email: String,
    firstName: String,
    LastName: String,
    avatar: String,
    likedproducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    isadmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);