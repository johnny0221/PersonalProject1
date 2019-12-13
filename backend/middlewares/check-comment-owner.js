const Comment = require('../models/comment');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];//check the header named authorization
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = { name: decodedToken.username, userId: decodedToken.userId }; //setting a global variable in nodejs.
    Comment.findById(req.params.id)
        .then((comment) => {
            if ((comment.author.equals(req.userData.userId)) || req.userData.name === 'admin') {
                next();
            } else {
                throw ('not authenticated');
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(401).json({
                message: 'not authenticated'
            })
        })

}