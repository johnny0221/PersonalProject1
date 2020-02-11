const User = require("../models/user");
const Product = require("../models/product");

exports.CartAdd = (req, res) => {
    let FoundProduct;
    Product.findById(req.body.productId)
        .then((product) => {
            FoundProduct = product;
        })
        .then(() => {
            let order = {
                name: FoundProduct.name,
                price: FoundProduct.price,
                imageUrl: FoundProduct.imageUrl,
                productId: FoundProduct._id,
                quantity: 1
            };
            let itemExist = false;
            User.findById(req.body.userId)
                .then(user => {
                    user.cart.forEach(product => {
                        if (product.name === order.name) {
                            itemExist = true;
                            product.quantity += 1;
                            user.save();
                        }
                    });
                    if (itemExist === false) {
                        user.cart.push(order);
                        user.save();
                    }
                    res.status(200).json({
                        message: "item added"
                    });
                });
        });
};

//update single product's quantity
exports.CartUpdate = (req, res) => {
    User.findById(req.body.userId)
        .then((user) => {
            user.cart.forEach(product => {
                if (product.productId === req.body.productId) {
                    product.quantity = req.body.quant;
                    user.save();
                    res.status(200).json({
                        userdata: user
                    });
                }
            });
        })
};

//the trashcan btn will delete all the designated product
exports.CartDelete = (req, res) => {
    User.findById(req.body.userId)
        .then((user) => {
            console.log(req.body);
            user.cart = user.cart.filter(product => {
                return !(product.productId === req.body.productId);
            });
            user.save();
            res.status(200).json({
                userdata: user
            });
        })
};
