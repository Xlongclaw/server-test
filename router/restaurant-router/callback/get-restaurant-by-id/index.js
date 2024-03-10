const restaurantModel = require("../../../../database/models/restaurantModel");

const getRestaurantById= async (request,response)=>{
  try{
    if(request.query._id){
      const restaurant = await restaurantModel.findOne({_id:request.query._id})
      if(restaurant) response.json({"code":'SUCCESS', data:restaurant})
      else response.json({"code":"NOT_FOUND"})
    }
    else response.json({code:"INVALID_ID"})
  }
  catch(err){
    console.log(err);
    response.status(400).json({code:"SOMETHING_WENT_WRONG"})
  }
}

module.exports = getRestaurantById