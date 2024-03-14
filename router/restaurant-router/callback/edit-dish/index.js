const dishModel = require("../../../../database/models/dishModel");

const editDish = async (request, response) => {
  try {
    if (!request.body) {
      response.json({ code: "DATA_NOT_FOUND", message: "NO DATA" });
    } else {
      const dish = await dishModel.updateOne(
        { _id: request.body.dishId },
        {
          description: request.body.dish.description,
          image: request.body.dish.image,
          name: request.body.dish.name,
          nonVeg: request.body.dish.nonVeg,
          prepTime: request.body.dish.prepTime,
          price: request.body.dish.price,
        }
      );
      response.json({ code: "SUCCESS" });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = editDish;
