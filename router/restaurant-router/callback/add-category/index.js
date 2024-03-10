const foodCategoryModel = require("../../../../database/models/foodCategoryModel");
const restaurantModel = require("../../../../database/models/restaurantModel");

const addCategory = async (request, response) => {
  console.log(request.body);
  try {
    if (!request.body.name) {
      response.json({
        code: "NAME_OR_ID_NOT_FOUND",
        message: "Request Body does not contain name or restaurantId",
      });
    } else {
      const category = await foodCategoryModel.create({
        category: request.body.name,
      });
      if (category) {
         await restaurantModel.updateOne(
          { _id: request.body.restaurantId },
          { $push: { foodCategoryIds: category._id } }
        );
        response.json({ code: "SUCCESS", _id: category._id });
      }
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = addCategory;
