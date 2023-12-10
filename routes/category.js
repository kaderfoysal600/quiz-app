import categoryController from "../controllers/categoryController";
const express = require("express");
const router = express.Router();

router.post("/categories", categoryController.createCategory);
router.get("/categories", categoryController.getAllCategories);
router.post("/subcategories", subcategoryController.createSubcategory);
router.get("/subcategories", subcategoryController.getAllSubcategories);

module.exports = router;
