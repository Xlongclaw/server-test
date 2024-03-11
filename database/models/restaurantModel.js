const mongoose = require('mongoose')

const RestaurantSchema =new mongoose.Schema({
  name:String,
  address:String,
  description:String,
  minPrepTime:Number,
  maxPrepTime:Number,
  foodTags:[String],
  restaurantTags:[String],
  images:[{
    publicId:String,
    url:String,
    signature:String
  }],
  foodCategoryIds:[{
    name:String,
    dishIds:[String]
  }],
  rating:Number,
  isOpen:{
    type:String,
    default:false
  }
})

const restaurantModel = mongoose.model("restaurant",RestaurantSchema)

module.exports = restaurantModel