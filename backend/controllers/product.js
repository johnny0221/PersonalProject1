const Product = require("../models/product");

exports.CreateProduct = (req, res) => {
    let sideProducts = [];
    let randomNumber = Math.floor(Math.random() * 5);
    Product.find({ type: req.body.type }).skip(randomNumber).limit(2)
        .then((data) => {
            sideProducts = data;
            const newProduct = new Product(
                {
                    name: req.body.name,
                    type: req.body.type,
                    imageUrl: req.body.imageUrl,
                    calory: req.body.calory,
                    price: req.body.price,
                    likes: 0,
                    alsoLike: sideProducts,
                    ingredients: req.body.ingredients,
                    description: req.body.description
                }
            );
            newProduct.save()
                .then(
                    (result) => {
                        res.status(200).json({
                            message: 'successfully added a product'
                        })
                    }
                )
        })
        .catch(
            (error) => {
                res.status(400).json({
                    message: 'something goes wrong, adding product failed'
                })
            }
        )
};

exports.GetProduct = (req, res) => {
    Product.find()
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
};

exports.GetDessertProduct = (req, res) => {
    Product.find({ type: 'desserts' })
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
};

exports.GetDrinkProduct = (req, res) => {
    Product.find({ type: 'drinks' })
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
};

exports.GetLightmealProduct = (req, res) => {
    Product.find({ type: 'lightmeals' })
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
};

//search product
exports.SearchProduct = (req, res) => {
    Product.find({ name: new RegExp(req.body.input), type: req.body.type })
        .then((data) => {
            res.status(200).json({
                data: data
            })
        })
};

exports.GetTargetProduct = (req, res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    if (pageSize && currentPage) {
        Product.findById(req.params.id).populate('comments').populate('alsoLike').exec().then((data) => {
            let maxComments = data.comments.length;
            let comments = data.comments;
            let lastFetched = currentPage * pageSize;
            comments = comments.slice(((currentPage - 1) * pageSize), lastFetched);
            res.status(200).json({
                data: data,
                comments: comments,
                maxComments: maxComments
            });
        })
    } else {
        Product.findById(req.params.id).populate('comments').populate('alsoLike').exec().then((data) => {
            res.status(200).json({
                data: data
            });
        })
    }

};

exports.UpdateProduct = (req, res) => {
    const updateProduct = new Product({
        _id: req.body.id,
        name: req.body.name,
        type: req.body.type,
        prcie: req.body.price,
        calory: req.body.calory,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        ingredients: req.body.ingredients
    })
    Product.updateOne({ _id: req.body.id }, updateProduct)
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({
                    message: "successfully updated"
                });
            } else {
                res.status(401).json({
                    message: "not authorized"
                });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "could not update the person"
            });
        });
};

exports.DeleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.n > 0) {
                res.status(200).json({
                    message: 'successfully deleted'
                });
            } else {
                res.status(401).json({
                    message: 'not authorized'
                });
            }
        })
        .catch((error) => {
            res.status(501).json({
                message: 'fetching failed'
            });
        });
};