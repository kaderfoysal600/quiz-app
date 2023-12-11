const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;

// subcategoryModel.js

const subcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

subcategorySchema.methods.getCategory = async function () {
  await this.populate("category").execPopulate();
  return this.category;
};

const Subcategory = mongoose.model("Subcategory", subcategorySchema);

module.exports = Subcategory;

const subSubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subcategory_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },
});

module.exports = mongoose.model("subSubcategory", subSubcategorySchema);
