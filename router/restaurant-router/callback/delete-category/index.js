const restaurantModel = require("../../../../database/models/restaurantModel");

const deleteCategory = async (request, response) => {
  console.log(request.body);
  try {
    if (!request.body.restaurantId) {
      response.json({
        code: "RESTAURANT_ID_OR_CATEGORY_ID_NOT_FOUND",
        message: "Request Body does not contain CategoryId OR RestaurantId",
      });
    } else {
      const category = await restaurantModel.updateOne(
        {
          _id: request.body.restaurantId,
        },
        {
          $pull: { foodCategories: { _id: request.body.categoryId } },
        }
      );
      if (category) {
        response.json({ code: "SUCCESS" });
      } else response.json({ code: "NOT_DELETED" });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = deleteCategory;
