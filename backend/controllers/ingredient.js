const Ingredient = require("../models/ingredient");

exports.GetIngredients = (req, res) => {
    Ingredient.find().then(ingredients => {
        res.status(200).json({
            ingredients: ingredients[0].ingredients
        });
    });
};

exports.UpdateIngredients = (req, res) => {
    //we have to create a new Model object if we want to use updateOne
    const newIngredient = new Ingredient({
        _id: "5dd1e9273cec482eb8be02de",
        ingredients: req.body
    })
    Ingredient.updateOne({ _id: "5dd1e9273cec482eb8be02de" }, newIngredient).then((data) => {
        if (data.n > 0) {
            res.status(200).json({
                msg: 'successfully updated'
            });
        }
    });
};