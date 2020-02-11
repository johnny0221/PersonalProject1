const express = require('express');
const CartController = require('../controllers/cart');
const checkAdmin = require('../middlewares/check-admin');
const checkAuth = require('../middlewares/check-auth');
const router = express.Router();

router.post("/add", checkAuth, CartController.CartAdd);

router.post("/update", checkAuth, CartController.CartUpdate);

router.post("/deleteall", checkAuth, CartController.CartDelete);

module.exports = router;