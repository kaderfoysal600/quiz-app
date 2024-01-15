const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authMiddle");
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
  getSubCategoryByCategory,
  getSubSubCategoriesBySub,
} = require("../controllers/control");

const validateToken = require("../middleware/errorhandler");

// router.use(validateToken);

router.get("/", (req, res) => {
  res.status(200).json({
    message: "It works!",
  });
});

//@ For Read & Write Category
// router.use("/category", auth);
// router.route("/category").post(createCategory);
// router.route("/category").get(getCategory)
router.route("/category")
  .post(createCategory)
  .get(getCategory);

//@ For Read & Write SubCategory
router.route("/subcategory").get(getSubCategory).post(createSubCategory);

// router.use("/subcategoryByCategory", );
router.route("/subcategoryByCategory/:categoryId").get(getSubCategoryByCategory);

//@ For Read & Write SubSubCategory
// router.use("/subSubcategory", );
router
  .route("/subSubcategory")
  .get(getSubSubCategories)
  .post(createSubSubCategory);

// router.use("/subSubCategoryById",);
router.route("/subSubCategoryById/:subCategoryId").get(getSubSubCategoriesBySub);

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
