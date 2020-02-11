const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.UserSignup = (req, res) => {
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

};

exports.UserLogin = (req, res) => {
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
};

exports.GetTargetUser = (req, res) => {
    User.findById(req.params.id)
        .then((data) => {
            res.status(200).json({
                userdata: data
            });
        });
};

exports.GetUser = (req, res) => {
    User.find({}).then((data) => {
        res.status(200).json({
            data: data
        })
    });
};