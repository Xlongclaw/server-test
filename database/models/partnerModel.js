const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  name: String,
  password: String,
  phoneNumber: String,
  restaurantId: String,
  orderIds: [String],
});


const partnerModel = mongoose.model("Partner", partnerSchema);

module.exports = partnerModel;