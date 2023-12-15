const asyncHandler = require("express-async-handler");
const Category = require("../models/catModels");
const SubCategory = require("../models/sub_cat_Models");
const SubSubCategory = require("../models/sub_sub_cat_model");
const { json } = require("body-parser");

//@desc Get all category
//@route GET all_category
//@access private
const getCategory = asyncHandler(async (req, res) => {
  const category_name = await Category.find(
    req.params
    // name: req.params.name,
    // description: req.description
  );

  res.status(200).json(category_name);
});

//@desc Get all Subcategory
//@route GET all Sub_subcategory
//@access private
const getSubCategory = asyncHandler(async (req, res) => {
  const Sub_category_name = await SubCategory.find(req.params);
  res.status(200).json(Sub_category_name);
});

//@desc Create New Category
//@route POST /api/Category
//@access private
const createCategory = asyncHandler(async (req, res) => {
  console.log("The request body of category is :", req.body);
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(400);
    throw new Error("fill the all required field");
  }
  const cate = await Category.create({
    name,
    description,
  });

  res.status(201).json(cate);
});

//@desc Create New SubCategory
//@route POST /Subcategory
//@access private
const createSubCategory = asyncHandler(async (req, res) => {
  console.log("The request body of SubCategory is :", req.body);

  const { category_Id, name, description } = req.body;

  if (!name || !description || !category_Id) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const sub_cat_data = await SubCategory.create({
    category_Id,
    name,
    description,
  });
  console.log("The sub_cat_data is :", sub_cat_data);

  res.status(201).json({ sub_cat_data });
});

//@desc Get category
//@route GET category/:id
//@access private
const getCategory_id = asyncHandler(async (req, res, next) => {
  const cat_id = await Category.findById(req.params.id);

  if (!cat_id) {
    res
      .status(400)
      .json({ success: false, message: `No data for this ${req.params.id}` });
  } else {
    res.status(200).json({ success: true, cat_id });
  }
});

//@desc Get subcategory
//@route GET subcategory/:id
//@access private
const getSubCategory_id = asyncHandler(async (req, res) => {
  const sub_cat_name = await SubCategory.findById(req.params.id).populate(
    "category_Id"
  );
  if (!sub_cat_name) {
    res.status(404);
    throw new Error("SubCategory not found");
  }
  res.status(200).json(sub_cat_name);
});

//@desc Update category
//@route PUT category/:id
//@access private
const updateCategory = asyncHandler(async (req, res) => {
  const cat_data = await Category.findById(req.params.id);
  if (!cat_data) {
    res.status(404);
    throw new Error("Category not found");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id, // check
    req.body,
    { new: true }
  );

  res.status(200).json(updatedCategory);
});

//@desc Update SubCategory
//@route PUT /SubCategory/:id

//@access private
const updateSubCategory = asyncHandler(async (req, res) => {
  const Sub_Cat_Data = await SubCategory.findById(req.params.id);
  if (!Sub_Cat_Data) {
    res.status(404);
    throw new Error("Subcategory not found");
  }

  //   if (SubCategory.id.toString() !== req.id) {
  //     res.status(403);
  //     throw new Error("User don't have permission to update other user contacts");
  //   }

  const updatedSubCat = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedSubCat);
});

//@desc Delete Category
//@route DELETE Category/:id
//@access private
const deleteCategory = asyncHandler(async (req, res) => {
  const DelCategory = await Category.findById(req.params.id);
  if (!DelCategory) {
    res.status(404);
    throw new Error("Category not found");
  }

  await Category.deleteOne({ _id: req.params.id });
  res.status(200).json(DelCategory);
});

//@desc Delete Subcategory
//@ Delete /api/SubCategory/:id
//@access private
const deleteSubCategory = asyncHandler(async (req, res) => {
  const deleteSubCategory = await SubCategory.findById(req.params.id);
  if (!deleteSubCategory) {
    res.status(404);
    throw new Error("SubCategory Not Found");
  }
  await SubCategory.deleteOne({ _id: req.params.id });
  res.status(200).json(deleteSubCategory);
});

// Get all sub-sub-categories
const getSubSubCategories = asyncHandler(async (req, res) => {
  const sub_sub_categories = await SubSubCategory.find(req.params);
  res.status(200).json(sub_sub_categories);
});

// Create new sub-sub-category
const createSubSubCategory = asyncHandler(async (req, res) => {
  const { sub_category_Id, name, description } = req.body;
  

  if (!sub_category_Id || !name || !description) {
    throw new Error("Please fill all required fields.");
  }

  const sub_sub_category = await SubSubCategory.create({
    sub_category_Id,
    name,
    description,
  });

  res.status(201).json(sub_sub_category);
});

// Get sub-sub-category by ID
const getSubSubCategoryById = asyncHandler(async (req, res) => {
  const sub_sub_category = await SubSubCategory.findById(
    req.params.id
  ).populate(["category_Id", "sub_category_Id"]);

  if (!sub_sub_category) {
    throw new Error("Sub-sub-category not found.");
  }

  res.status(200).json(sub_sub_category);
});

// Update sub-sub-category
const updateSubSubCategory = asyncHandler(async (req, res) => {
  const sub_sub_category = await SubSubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!sub_sub_category) {
    throw new Error("Sub-sub-category not found.");
  }

  res.status(200).json(sub_sub_category);
});

// Delete sub-sub-category
const deleteSubSubCategory = asyncHandler(async (req, res) => {
  const sub_sub_category = await SubSubCategory.findByIdAndDelete(
    req.params.id
  );

  if (!sub_sub_category) {
    throw new Error("Sub-sub-category not found.");
  }

  res.status(200).json({ message: "Sub-sub-category deleted successfully." });
});

module.exports = {
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
};
