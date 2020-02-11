const express = require('express');
const IngredientController = require('../controllers/ingredient');
const checkAdmin = require('../middlewares/check-admin');
const router = express.Router();

router.get("", checkAdmin, IngredientController.GetIngredients);

router.put("", checkAdmin, IngredientController.UpdateIngredients);

module.exports = router;