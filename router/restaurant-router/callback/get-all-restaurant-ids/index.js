const restaurantModel = require("../../../../database/models/restaurantModel");

const getAllRestaurantIds= async (request,response)=>{
  try{
      const restaurants = await restaurantModel.find({}).select('_id')
      if(restaurants) response.json({"code":'SUCCESS', data:restaurants})
      else response.json({"code":"NOT_FOUND"})
  }
  catch(err){
    console.log(err);
    response.status(400).json({code:"SOMETHING_WENT_WRONG"})
  }
}

module.exports = getAllRestaurantIds