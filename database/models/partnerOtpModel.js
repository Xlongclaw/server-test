const mongoose = require('mongoose')
const PartnerOtpSchema = new mongoose.Schema({
  phoneNumber:String,
  otp:String,
  
  expireAt: { type: Date,  expires: 300 }
})

const partnerOtpModel = mongoose.model("partnerotp",PartnerOtpSchema)

module.exports = partnerOtpModel