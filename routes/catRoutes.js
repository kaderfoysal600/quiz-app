const express = require("express");
const router = express.Router();

const {
  getCategory,
  getSubCategory,
  createCategory,
  createSubCategory,
  getCategory_id,
  getSubCategory_id,
  updateCategory,
  updateSubCategory,
  deleteCategory,
  deleteSubCategory,
  getSubSubCategories,
  createSubSubCategory,
  getSubSubCategoryById,
  updateSubSubCategory,
  deleteSubSubCategory,
} = require("../controllers/control");

const validateToken = require("../middleware/errorhandler");

// router.use(validateToken);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "It works!",
  });
});

//@ For Read & Write Category
router.route("/category").get(getCategory).post(createCategory);

//@ For Read & Write SubCategory
router.route("/subcategory").get(getSubCategory).post(createSubCategory);

//@ For Read & Write SubSubCategory
router
  .route("/subSubcategory")
  .get(getSubSubCategories)
  .post(createSubSubCategory);

//@ For delete update and read by id Category
router
  .route("/category/:id")
  .get(getCategory_id)
  .put(updateCategory)
  .delete(deleteCategory);

//@ For delete update and read by id SubCategory
router
  .route("/subcategory/:id")
  .get(getSubCategory_id)
  .put(updateSubCategory)
  .delete(deleteSubCategory);

module.exports = router;
