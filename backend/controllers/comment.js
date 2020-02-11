const Comment = require("../models/comment");
const User = require("../models/user");
const Product = require("../models/product");

exports.AddComment = (req, res) => {
    console.log("in");
    let currentUser;
    let comment;
    User.find({ _id: req.body.userId })
        .then((user) => {
            currentUser = user;
        })
        .then(() => {
            comment = new Comment({
                author: req.body.userId,
                createdBy: currentUser[0].name,
                text: req.body.comment
            });
            comment.save();
        })
        .then(() => {
            Product.findById(req.body.productId)
                .then((product) => {
                    product.comments.push(comment)
                    product.save();
                    res.status(200).json({
                        message: 'successfully added comment',
                        product: product
                    })
                });
        })
        .catch(error => {
            res.json({
                message: 'update error'
            })
        });
};

//Comment delete
exports.DeleteComment = (req, res) => {
    Comment.deleteOne({ _id: req.params.id })
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