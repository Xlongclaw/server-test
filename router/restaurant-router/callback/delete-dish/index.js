const dishModel = require("../../../../database/models/dishModel");
const restaurantModel = require("../../../../database/models/restaurantModel");

const deleteDish = async (request, response) => {
  try {
    if (!request.body.restaurantId) {
      response.json({ code: "DATA_NOT_FOUND", message: "NO DATA" });
    } else {
      await restaurantModel.updateOne(
        {
          _id: request.body.restaurantId,
          foodCategories: { $elemMatch: { _id: request.body.categoryId } },
        },
        {
          $pull: { "foodCategories.$.dishIds": { $in: [request.body.dishId] } },
        }
      );
      await dishModel.deleteOne({ _id: request.body.dishId });
      response.json({ code: "SUCCESS" });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = deleteDish;
