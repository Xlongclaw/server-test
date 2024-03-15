const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
  name:String,
  password:String,
  phoneNumber:String,
  basket:[{
    restaurantId:String,
    orderItems:[
      {
        dishId:String,
        quantity:Number
      }
    ]
  }]
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel