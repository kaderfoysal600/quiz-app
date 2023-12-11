const mongoose = require("mongoose");



const category_schema = mongoose.Schema({

    name: {
    type: String,
    required: true
    },
    description: {
    type: String,
    required: true
  }

});


module.exports = mongoose.model("Category", category_schema);



































// const subCategorySchema = mongoose.Schema({

//     // category : category_schema,

//     name: {
//         type: String,
//         required: true,
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     price : {
//         type: Number,
//         default:0
//     },

//     Category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Category',
//         required:true
//     },


//     countInStock: {
//         type: Number,
//         required: true,
//         min: 0,
//         max: 255
//     },
// },
// {
//     timestamps: true,
// }
// )


// const SubCategory = mongoose.model('SubCategory', subCategorySchema);

// module.exports = { Category , SubCategory };