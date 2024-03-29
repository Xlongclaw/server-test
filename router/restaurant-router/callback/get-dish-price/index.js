const dishModel = require("../../../../database/models/dishModel");

const getDishPrice = async (request, response) => {
  try {
    if(!request.query._id){
      response.json({code:'ID_NOT_FOUND',message:'_id not found'})
    }
    else{
      const dish = await dishModel.findOne({_id:request.query._id},"price")
      response.json({code:'SUCCESS',dish})
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = getDishPrice;
