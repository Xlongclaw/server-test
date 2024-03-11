const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: String,
  description: String,
  prepTime: Number,
  price: Number,
  nonVeg: Boolean,
  rating: Number,
  image: {
    publicId:String,
    url:String,
    signature:String
  },
  available: Boolean,
});

const dishModel = mongoose.model("dish", DishSchema);

module.exports = dishModel;
