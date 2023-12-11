const mongoose = require("mongoose");


// const Category = mongoose.model("Category", category_schema);


const SubCategory_schema =  mongoose.Schema({

    // category : category_schema,

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
    },

    price : {
        type: Number,
        default:0
    },

    // category_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required:true
    // },


    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },

},
{
    timestamps: true,
}
);

module.exports = mongoose.model("SubCategory", SubCategory_schema)


