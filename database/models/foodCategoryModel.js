const mongoose = require('mongoose')

const FoodCategorySchema =new mongoose.Schema({
  category:String,
  dishIds:[String]
})

const foodCategoryModel = mongoose.model("foodCategory",FoodCategorySchema)

module.exports = foodCategoryModel