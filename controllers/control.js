const asyncHandler = require("express-async-handler");
const Category = require("../models/catModels");
const SubCategory = require("../models/sub_cat_Models");
const SubSubCategory = require("../models/sub_sub_cat_model");
const { json } = require("body-parser");
const primaryCategory = require("../models/primaryCategory");

//@desc Get all category
//@route GET all_category
//@access private
// const getCategory = asyncHandler(async (req, res) => {
//   const categories = await Category.find();
//   res.status(200).json(categories);
// });

const getCategory = asyncHandler(async (req, res) => {
  // Get the email from the request header
  const email = req.headers.email;

  // Find the primary category with the given email
  const primaryCat = await primaryCategory.findOne({ email });

  if (!primaryCat) {
    // If primary category not found, return all categories as usual
    const categories = await Category.find();
    res.status(200).json(categories);
    return;
  }

  // Find all categories
  const categories = await Category.find();

  // Sort categories array to prioritize the category with the matching primary_category_id
  categories.sort((a, b) => {
    if (a._id.toString() === primaryCat.primary_category_id) return -1;
    if (b._id.toString() === primaryCat.primary_category_id) return 1;
    return 0;
  });

  res.status(200).json(categories);
});



const getSubCategory = asyncHandler(async (req, res) => {
  // Use populate to include category information
  const subcategories = await SubCategory.find(req.params)
    .populate({
      path: "category_Id",
      model: "Category",
      select: "name", // Select the fields you want from the Category model
    })
    .exec();

  // Organize subcategories by category
  const organizedData = {};

  subcategories.forEach((subCategory) => {
    const categoryId = subCategory.category_Id._id;
    const categoryName = subCategory.category_Id.name;

    // Create category object if it doesn't exist
    if (!organizedData[categoryId]) {
      organizedData[categoryId] = {
        category_id: categoryId,
        category_name: categoryName,
        sub_categories: [],
      };
    }

    // Remove category_Id field and add subcategory to the category
    const { category_Id, ...subcategoryWithoutCategoryId } =
      subCategory.toObject();
    organizedData[categoryId].sub_categories.push(subcategoryWithoutCategoryId);
  });

  // Convert the object values to an array
  const resultArray = Object.values(organizedData);

  res.status(200).json(resultArray);
});

const getSubCategoryByCategory = asyncHandler(async (req, res) => {
  const categoryIdFromParams = req.params.categoryId;

  if (!categoryIdFromParams) {
    return res
      .status(400)
      .json({ error: "Category ID not provided in the parameters" });
  }

  // Use populate to include category information and filter by category ID
  const subcategories = await SubCategory.find({
    category_Id: categoryIdFromParams,
  })
    .populate({
      path: "category_Id",
      model: "Category",
      select: "name",
    })
    .exec();

  // Organize subcategories by category
  const organizedData = {};

  // Set category name based on the provided categoryId
  const category = await Category.findById(categoryIdFromParams);
  const categoryName = category ? category.name : '';

  if (!organizedData[categoryIdFromParams]) {
    organizedData[categoryIdFromParams] = {
      category_id: categoryIdFromParams,
      category_name: categoryName,
      sub_categories: [],
    };
  }

  subcategories.forEach((subCategory) => {
    const categoryId = subCategory.category_Id._id;

    const { category_Id, ...subcategoryWithoutCategoryId } =
      subCategory.toObject();
    organizedData[categoryId].sub_categories.push(subcategoryWithoutCategoryId);
  });

  // Check if subcategories array is empty and construct response accordingly
  const resultArray = Object.values(organizedData);
  const response =
    resultArray.length > 0
      ? resultArray[0]
      : {
          category_id: categoryIdFromParams,
          category_name: categoryName,
          sub_categories: [],
        };

  res.status(200).json(response);
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
    description
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
// const getSubSubCategories = asyncHandler(async (req, res) => {
//   // Use populate to include sub-category information
//   const subSubCategories = await SubSubCategory.find(req.params)
//     .populate({
//       path: "sub_category_Id",
//       model: "SubCategory",
//       populate: {
//         path: "category_Id",
//         model: "Category",
//         select: "name", // Select the fields you want from the Category model
//       },
//     })
//     .exec();

//   res.status(200).json(subSubCategories);
// });

const getSubSubCategories = asyncHandler(async (req, res) => {
  // Use populate to include sub-category and category information
  const subSubCategories = await SubSubCategory.find(req.params)
    .populate({
      path: "sub_category_Id",
      model: "SubCategory",
      populate: {
        path: "category_Id",
        model: "Category",
        select: "name", // Select the fields you want from the Category model
      },
    })
    .exec();

  // Organize sub-subcategories by sub-category and category
  const organizedData = {};

  subSubCategories.forEach((subSubCategory) => {
    const subCategoryId = subSubCategory.sub_category_Id._id;
    const categoryId = subSubCategory.sub_category_Id.category_Id._id;

    // Create sub-category object if it doesn't exist
    if (!organizedData[subCategoryId]) {
      organizedData[subCategoryId] = {
        sub_category_Id: subCategoryId,
        category_Id: categoryId,
        subSubCategories: [],
      };
    }

    // Remove unnecessary fields and add sub-subcategory to the sub-category
    const { sub_category_Id, ...subSubCategoryWithoutSubCategoryId } =
      subSubCategory.toObject();
    organizedData[subCategoryId].subSubCategories.push(
      subSubCategoryWithoutSubCategoryId
    );
  });

  // Convert the object values to an array
  const resultArray = Object.values(organizedData);

  res.status(200).json(resultArray);
});

const getSubSubCategoriesBySub = asyncHandler(async (req, res) => {
  const subCategoryIdFromParams = req.params.subCategoryId;

  if (!subCategoryIdFromParams) {
    return res
      .status(400)
      .json({ error: "Sub-Category ID not provided in the parameters" });
  }

  // Use populate to include sub-category and category information and filter by sub-category ID
  const subSubCategories = await SubSubCategory.find({
    sub_category_Id: subCategoryIdFromParams,
  })
    .populate({
      path: "sub_category_Id",
      model: "SubCategory",
      populate: {
        path: "category_Id",
        model: "Category",
        select: "name",
      },
    })
    .exec();

  // Organize sub-subcategories by sub-category and category
  const organizedData = {};

  subSubCategories.forEach((subSubCategory) => {
    const subCategoryId = subSubCategory.sub_category_Id._id;
    const categoryId = subSubCategory.sub_category_Id.category_Id._id;

    if (!organizedData[subCategoryId]) {
      organizedData[subCategoryId] = {
        sub_category_Id: subCategoryId,
        category_Id: categoryId,
        subSubCategories: [],
      };
    }

    const { sub_category_Id, ...subSubCategoryWithoutSubCategoryId } =
      subSubCategory.toObject();
    organizedData[subCategoryId].subSubCategories.push(
      subSubCategoryWithoutSubCategoryId
    );
  });

  // Construct response object with category name and sub-category name even if no sub-subcategories are found
  const response = organizedData[subCategoryIdFromParams] || {
    sub_category_Id: subCategoryIdFromParams,
    subSubCategories: [],
  };

  res.status(200).json(response);
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


const createPrimaryCategory = async (req, res) => {
  try {
    const { primary_category_id , email } = req.body;
    const pCategory = await primaryCategory.create({ primary_category_id , email});
    
    res.status(201).json({
      success: true,
      pCategory,
      message: "Primary Category created successfully ✅",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Primary Category creation failed",
    });
  }
};

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
  getSubCategoryByCategory,
  getSubSubCategoriesBySub,
  createPrimaryCategory
};
