const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
  name: String,
  description: String,
  prepTime: Number,
  price: Number,
  nonVeg: Boolean,
  rating: {
    type: Number,
    default: 5,
  },
  image: {
    publicId: String,
    url: String,
    signature: String,
  },
  available: { type: Boolean, default: true },
});

const dishModel = mongoose.model("dish", DishSchema);

module.exports = dishModel;
