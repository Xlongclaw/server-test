const dishModel = require("../../../../database/models/dishModel");
const restaurantModel = require("../../../../database/models/restaurantModel");

const addDish = async (request, response) => {
  try {
    if (!request.body) {
      response.json({ code: "DATA_NOT_FOUND", message: "NO DATA" });
    } else {
      const dish = await dishModel.create({
        description: request.body.dish.description,
        image: request.body.dish.image,
        name: request.body.dish.name,
        nonVeg: request.body.dish.nonVeg,
        prepTime: request.body.dish.prepTime,
        price: request.body.dish.price,
      });

      const filter = {
        _id: request.body.restaurantId,
        foodCategories: { $elemMatch: { _id: request.body.categoryId } },
      };
      await restaurantModel.updateOne(
        filter,
        { $push: { "foodCategories.$.dishIds": dish._id } }
      );
      response.json({ code: "SUCCESS" });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = addDish;
