const express = require("express");
const userRoutes = express.Router();
const controller = require("../controllers/product.controller");

userRoutes.get("/getAll", controller.getAllProducts);
userRoutes.post("/create", controller.createProduct);
userRoutes.post("/update", controller.updateProduct);
userRoutes.delete("/delete", controller.deleteProduct);

module.exports = userRoutes;