const express = require('express');
const ProductController = require('../controllers/product');
const checkAdmin = require('../middlewares/check-admin');
const router = express.Router();

router.post("", checkAdmin, ProductController.CreateProduct);

router.get("", ProductController.GetProduct);

router.get("/dessert", ProductController.GetDessertProduct);

router.get("/drink", ProductController.GetDrinkProduct);

router.get("/lightmeal", ProductController.GetLightmealProduct);

router.post("/search", ProductController.SearchProduct);

router.get("/:id", ProductController.GetTargetProduct);

router.put("/:id", checkAdmin, ProductController.UpdateProduct);

router.delete("/:id", checkAdmin, ProductController.DeleteProduct);

module.exports = router;