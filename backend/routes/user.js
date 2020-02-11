const express = require('express');
const UserController = require('../controllers/user');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

router.post("/signup", UserController.UserSignup);

router.post("/login", UserController.UserLogin);

router.get("/:id", checkAuth, UserController.GetTargetUser);

router.get("", UserController.GetUser);



module.exports = router;