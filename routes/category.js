const {
  createCategory,
  getAllCategories,
  createSubcategory,
  getAllSubcategories,
} = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.post("/subcategories", createSubcategory);
router.get("/subcategories", getAllSubcategories);

module.exports = router;
