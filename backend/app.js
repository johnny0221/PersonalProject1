const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const People = require('./models/people');
const Product = require('./models/product');
const Comment = require('./models/comment');
const User = require('./models/user');
const Ingredient = require('./models/ingredient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const checkAdmin = require('./middlewares/check-admin');
const checkCommentOwner = require('./middlewares/check-comment-owner');
const checkAuth = require('./middlewares/check-auth');
const async = require('async');
const nodemailer = require("nodemailer");
const crypto = require("crypto");


mongoose.connect("mongodb+srv://johnny:Aa00850221@cluster0-yzadz.mongodb.net/OMO?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('db connected');
    })
    .catch((error) => {
        console.log('connection failed');
    })

mongoose.set('useCreateIndex', true);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//CORS
app.use((req, res, next) => {
    //which domain is allowed to fetch the data.
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, user"
    );
    //which http verbs are allow to send requests.
    //"Options" is a http verb that will be sent by the browser before POST, so we need to allow it too.
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
})


//CRUD People Start
app.get('/people', (req, res) => {
    People.find()
        .then(
            data => {
                res.status(200).json({
                    data: data
                });
            }
        )
});

app.get('/people/:id', (req, res) => {
    People.findById(req.params.id)
        .then((data) => {
            res.status(200).json({
                data: data
            })
        }
        )
});

app.post('/people', checkAdmin, (req, res) => {
    const newPerson = new People({
        name: req.body.name,
        age: req.body.age,
        image: req.body.image,
        position: req.body.position,
        text: req.body.text
    });
    newPerson.save()
        .then((result) => {
            res.status(200).json({
                message: 'successfully create a user'
            });
        });
})

app.put('/people/:id', checkAdmin, (req, res) => {
    const updatePerson = new People({
        _id: req.body.id,
        name: req.body.name,
        position: req.body.position,
        age: req.body.age,
        text: req.body.description,
        image: req.body.image
    })
    People.updateOne({ _id: req.body.id }, updatePerson)
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
});

app.delete('/people/:id', checkAdmin, (req, res) => {
    People.deleteOne({ _id: req.params.id })
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
});

//CRUD People End

//CRUD Product Start
app.post('/product', checkAdmin, (req, res) => {
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
});

app.get('/product', (req, res) => {
    Product.find()
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
});

app.get('/product/dessert', (req, res) => {
    Product.find({ type: 'desserts' })
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
});

app.get('/product/drink', (req, res) => {
    Product.find({ type: 'drinks' })
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
});

app.get('/product/lightmeal', (req, res) => {
    Product.find({ type: 'lightmeals' })
        .then(
            (data) => {
                res.status(200).json({
                    data: data
                })
            });
});

//for mainPage random data
app.get('/randomproduct', (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10);
    Product.find({}).skip(randomNumber).limit(4).then(
        (data) => {
            res.status(200).send(data);
        });

});

app.get('/product/:id', (req, res) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    if (pageSize && currentPage) {
        Product.findById(req.params.id).populate('comments').populate('alsoLike').exec().then((data) => {
            let maxComments = data.comments.length;
            let comments = data.comments;
            let lastFetched = currentPage * pageSize;
            if (lastFetched > maxComments) {
                lastFetched = maxComments;
            }
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

});

app.put('/product/:id', checkAdmin, (req, res) => {
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
});

app.delete('/product/:id', checkAdmin, (req, res) => {
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
});

//ingredient CRUD
// app.post('/ingredient', (req, res) => {
//     const ingredients = new Ingredient({
//         ingredients: req.body
//     })
//     ingredients.save().then(() => {
//         console.log('saved');
//     })
// });

app.get('/ingredient', checkAdmin, (req, res) => {
    Ingredient.find().then(ingredients => {
        res.status(200).json({
            ingredients: ingredients[0].ingredients
        });
    });
});

app.put('/ingredient', checkAdmin, (req, res) => {
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
});

//User CRUD start 
app.post('/user/signup', (req, res) => {
    let user;
    bcrypt.hash(req.body.password, 10)
        .then((hashedPassword) => {
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            user.save()
                .then((result) => {
                    res.status(200).json({
                        message: 'User created Successfully',
                        result: result
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        message: 'Somethings goes wrong, please refill the form'
                    });
                })
        });

});

app.post('/user/login', (req, res) => {
    let fetchedUser;
    User.findOne({ name: req.body.name })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: '找不到該使用者名稱, 是否輸入錯了?'
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: '輸入的密碼有誤'
                });
            }
            const token = jwt.sign({ username: fetchedUser.name, userId: fetchedUser._id }, "secret_this_should_be_longer", { expiresIn: '1h' });
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                name: fetchedUser.name,
                likedProduct: fetchedUser.likedproducts,
                cart: fetchedUser.cart
            });
        })
        .catch(error => {
            res.json({
                message: 'an error has occurred'
            })
        });
});

app.get('/user/:id', checkAuth, (req, res) => {
    User.findById(req.params.id).populate('cart').exec()
        .then((data) => {
            res.status(200).json({
                userdata: data
            });
        });
});

app.get('/user', (req, res) => {
    User.find({}).then((data) => {
        res.status(200).json({
            data: data
        })
    });
});


//comment crud start
app.post('/comment/add', checkAuth, (req, res) => {
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
});

//Comment delete
app.delete('/comment/delete/:id', checkCommentOwner, (req, res) => {
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
});
//comment crud end
//shopping crud start

//add a single product to shopping cart.
app.post('/cart/add', checkAuth, (req, res) => {
    let FoundProduct;
    Product.findById(req.body.productId)
        .then((product) => {
            FoundProduct = product
        })
        .then(() => {
            User.findById(req.body.userId)
                .then(user => {
                    user.cart.push(FoundProduct);
                    user.save();
                    res.json({
                        message: 'hello'
                    })
                })
        })
});

//delete a single product from the shopping cart
app.post('/cart/delete', (req, res) => {
    User.findById(req.body.userId)
        .then((user) => {
            if (user.cart.indexOf(req.body.productId !== -1)) {
                ProductPosition = user.cart.indexOf(req.body.productId);
                user.cart.splice(ProductPosition, 1);
                user.save();
                res.status(200).json({
                    message: 'successfully deleted'
                });
            }
        });
});

//the trashcan btn will delete all the designated product
app.post('/cart/deleteall', (req, res) => {
    User.findById(req.body.userId)
        .then((user) => {
            user.cart = user.cart.filter(item => {
                return !item.equals(req.body.productId);
            });
            user.save();
            res.status(200).json({
                message: 'successfully deleted'
            });
        })
});

//contact page -> user quest send
app.post('/sendquestion', (req, res) => {
    let smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        port: 587,
        secure: false,
        auth: {
            user: "jim850221@gmail.com",
            pass: "vlxqinpvwrjbdynp"
        }
    });
    let mailOptions = {
        to: "jim850221@gmail.com",
        from: req.body.email,
        subject: 'user question from ' + req.body.lastName + " " + req.body.firstName,
        text: req.body.description
    };
    smtpTransport.sendMail(mailOptions, (err, data) => {
        if (err) {
            res.status(400).json({
                message: err
            })
        } else {
            res.status(200).json({
                message: "歐莫已經收到了您的訊息, 我們會盡快回復您 !"
            })
        }
    })
});

//forget password
app.post('/forgetpwd', (req, res) => {
    async.waterfall([
        function (done) {
            crypto.randomBytes(20, (err, buf) => {
                let token = buf.toString('hex');
                done(err, token);
            })
        },
        function (token, done) {
            User.findOne({ email: req.body.email })
                .then((user) => {
                    if (!user) {
                        return res.status(400).json({
                            message: "Email not found, please check if you enter the right email"
                        })
                    }
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 360000;//1 hour

                    user.save((err) => {
                        done(err, token, user)
                    })
                })
        },
        function (token, user, done) {
            const smtpTransport = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "jim850221@gmail.com",
                    pass: "vlxqinpvwrjbdynp"
                }
            });
            const mailOptions = {
                to: user.email,
                from: "omo.gmail.com",
                subject: "Password Reset Notification",
                text: "OMO Dessert Corp.",
                html: '<table width=100% border=0 cellspacing=0 cellpadding=0><tr><td align=center width: 50%; ><div style = "background-color: #F0F0F0; width: 50%;"><img src="cid:logo@omo.com" alt = "logo" style = "width:60px; height: 60px; border-radius: 50%; padding-top: 20px"><h2 style = "color: #654321;">OMO DESSERT PASSWORD RESET</h2><h3>Link:</h3><a href="http:/localhost:4200/reset/' + token + '"' + '>ResetPassword</a><p style = "color: #654321; font-size: 18px;">please click the link above to reset your password</p><p style = "color: #654321; padding: 40px 0 80px 0; ">連結將在1小時後失效</p><p style = "color: #654321; padding: 40px 0 80px 0; ">Thank you, OMO</p></div></td></tr></table>',
                attachments: [{
                    filename: 'omologo.jpg',
                    path: '../src/assets/imgs/omo.png',
                    cid: 'logo@omo.com'
                }],
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                res.status(200).json({
                    message: "更改密碼的郵件已發送至您的信箱, 請盡速確認"
                })
            });
        },

    ], (err) => {
        console.log(err);
        res.status(400).json({
            message: err
        })
    });
});

//is permitted to get to the resetToken page
app.post('/ispermitted', (req, res) => {
    User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "這個頁面已經過期了, 請在嘗試更改密碼一次"
                })
            }
            res.status(200).json({
                message: "authenticated"
            });
        });
});

//reset user's password
app.post('/resetpwd', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedpwd) => {
            User.updateOne({ resetPasswordToken: req.body.token }, { password: hashedpwd })
                .then((result) => {
                    if (result.n > 0) {
                        User.findOne({ resetPasswordToken: req.body.token, resetPasswordExpires: { $gt: Date.now() } })
                            .then((user) => {
                                user.resetPasswordToken = undefined;
                                user.resetPasswordExpires = undefined;
                                user.save();
                                return res.status(200).json({
                                    message: "已成功更新您的密碼, 請使用新密碼進行登入"
                                });
                            });
                    } else {
                        res.status(400).json({
                            message: "update failed"
                        });
                    }
                });
        });
});
module.exports = app;