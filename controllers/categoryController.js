const Category = require("../models/category");
const Subcategory = require("../models/category");
const subSubcategory = require("../models/category");
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json({
      success: true,
      category,
      message: "Category created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Category creation failed",
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
};

// subcategoryController.js

exports.createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategory = await Subcategory.create({
      name,
      category_id: categoryId,
    });
    res.status(201).json({
      success: true,
      subcategory,
      message: "Subcategory created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Subcategory creation failed",
    });
  }
};

exports.getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.status(200).json({
      success: true,
      subcategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subcategories",
    });
  }
};

// subSubcategoryController.js
exports.createSubSubcategory = async (req, res) => {
  try {
    const { name, subcategoryId } = req.body;
    const subSubcategories = await subSubcategory.create({
      name,
      subcategory_id: subcategoryId,
    });
    res.status(201).json({
      success: true,
      subSubcategories,
      message: "subSubcategories created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "subSubcategories creation failed",
    });
  }
};

exports.getAllSubSubcategories = async (req, res) => {
  try {
    const subSubcategories = await subSubcategory
      .find()
      .populate("subcategory");
    res.status(200).json({
      success: true,
      subSubcategories,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch subSubcategories",
    });
  }
};
