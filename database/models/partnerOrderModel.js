const mongoose  = require('mongoose')

const PartnerOrderSchema =new mongoose.Schema({
  orderPrice:Number,
  orderStatusCode:Number,
  // 100 -completed 101-accepted 103-pending 102-rejected 
  orderItems:[
    {
      itemId:String,
      itemQty:Number,
      itemPrice:Number
    },
  ],
});

const partnerOrderModel = mongoose.model("PartnerOrder", PartnerOrderSchema);
module.exports = partnerOrderModel;