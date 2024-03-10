const dishModel = require("../../../../database/models/dishModel");
const foodCategoryModel = require("../../../../database/models/foodCategoryModel");

const addDish = async (request, response) => {
  try {
    console.log(request.body);
    if (!request.body) {
      response.json({ code: "DATA_NOT_FOUND", message: "NO DATA" });
    } else {
      const dish = await dishModel.create({
        description: request.body.description,
        image: request.body.image,
        name: request.body.name,
        nonVeg: request.body.nonVeg,
        prepTime: request.body.prepTime,
        price: request.body.price,
      });
      await foodCategoryModel.updateOne(
        { _id: request.body.categoryId },
        { $push: { dishIds: dish.id } }
      );
      response.json({code:'SUCCESS'})
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = addDish;
