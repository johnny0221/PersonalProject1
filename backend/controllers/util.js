const Product = require("../models/product");
const User = require("../models/user");
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

exports.GetRandomProduct = (req, res) => {
    let randomNumber = Math.floor(Math.random() * 10);
    Product.find({}).skip(randomNumber).limit(3).then(
        (data) => {
            res.status(200).send(data);
        });

};

exports.SendQuestion = (req, res) => {
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
};

//forget password
exports.ForgetPwd = (req, res) => {
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
                html: '<table width=100% border=0 cellspacing=0 cellpadding=0><tr><td align=center width: 50%; ><div style = "background-color: #F0F0F0; width: 50%;"><img src="cid:logo@omo.com" alt = "logo" style = "width:60px; height: 60px; border-radius: 50%; padding-top: 20px"><h2 style = "color: #654321;">OMO DESSERT PASSWORD RESET</h2><h3>Link:</h3><a href="http:/localhost:4200/forget/reset/' + token + '"' + '>ResetPassword</a><p style = "color: #654321; font-size: 18px;">please click the link above to reset your password</p><p style = "color: #654321; padding: 40px 0 80px 0; ">連結將在1小時後失效</p><p style = "color: #654321; padding: 40px 0 80px 0; ">Thank you, OMO</p></div></td></tr></table>',
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
};

//is permitted to get to the resetToken page
exports.IsPermitted = (req, res) => {
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
};

//reset user's password
exports.ResetPwd = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((hashedpwd) => {
            userUpdate = {
                password: hashedpwd,
                resetPasswordExpires: undefined,
                resetPasswordToken: undefined
            }
            User.updateOne({ resetPasswordToken: req.body.token }, userUpdate)
                .then((result) => {
                    if (result.n > 0) {
                        res.status(200).json({
                            message: "已成功更新您的密碼, 請使用新密碼進行登入"
                        });
                    } else {
                        res.status(400).json({
                            message: "update failed"
                        });
                    }
                });
        });
};
