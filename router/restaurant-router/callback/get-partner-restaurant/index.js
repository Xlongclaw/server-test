const restaurantModel = require("../../../../database/models/restaurantModel");

const getPartnerRestaurant= async (request,response)=>{
  try{
    const restaurant = await restaurantModel.findOne({_id:request.query._id})
    // response.sen
  }
  catch(err){
    console.log(err);
    response.status(400).json({code:"SOMETHING_WENT_WRONG"})
  }
}

module.exports = getPartnerRestaurant