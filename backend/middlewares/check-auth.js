const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];//check the header named authorization
        const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
        req.userData = { name: decodedToken.username, userId: decodedToken.userId }; //setting a global variable in nodejs.
        if (req.userData.name) {
            next();
        } else {
            throw ('not authenticated');
        }
    } catch (error) {
        return res.status(401).json({
            message: "Please login first to access this page"
        })
    }
}