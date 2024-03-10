const foodCategoryModel = require("../../../../database/models/foodCategoryModel");

const getCategory = async (request, response) => {
  try {
    if(!request.query._id){
      response.json({code:'ID_NOT_FOUND',message:'_id not found'})
    }
    else{
      const foodCategory = await foodCategoryModel.findOne({_id:request.query._id})
      response.json({code:'SUCCESS',foodCategory})
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = getCategory;
