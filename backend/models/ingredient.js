const mongoose = require('mongoose');

const ingredientSchema = mongoose.Schema({
    name: String,
    ingredients: []
});

module.exports = mongoose.model('Ingredient', ingredientSchema);