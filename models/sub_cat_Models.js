const mongoose = require("mongoose");


// const Category = mongoose.model("Category", category_schema);


const SubCategory_schema =  mongoose.Schema({

    category_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required:true
    },

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true
    }

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("SubCategory", SubCategory_schema)


