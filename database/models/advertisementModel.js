const mongoose = require("mongoose");

const AdvertisementSchema = new mongoose.Schema({
  title:String,
  visible:Boolean,
  image:{
    url:String,
    signature:String,
    publicId:String
  }
});

const AdvertisementModel = mongoose.model("Advertisement", AdvertisementSchema);

module.exports = AdvertisementModel;
