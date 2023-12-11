const {
  createCategory,
  getAllCategories,
  createSubcategory,
  getAllSubcategories,
  createSubSubcategory,
  getAllSubSubcategories,
} = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
router.post("/subcategories", createSubcategory);
router.get("/subcategories", getAllSubcategories);

//sub sub category route

router.post("/subSubcategories", createSubSubcategory);
router.get("/list-sub-subcategories", getAllSubSubcategories);

module.exports = router;
