const dishModel = require("../../../../database/models/dishModel");
const userModel = require("../../../../database/models/userModel");
const verifyToken = require("../../../../utils/verifyToken");

const getDish = async (request, response) => {
  try {
    if (!request.query._id) {
      response.json({ code: "ID_NOT_FOUND", message: "_id not found" });
    } else {
      const dish = await dishModel.findOne({ _id: request.query._id });
      const tokenData = verifyToken(request.query.userToken);
      let count = 0;
      if (tokenData.status === "VERIFIED") {
        const data = await userModel.find({ phoneNumber: tokenData.data });
        const restaurantOrder = data[0].basket.filter(
          (element) => element.restaurantId === request.query.restaurantId
        );
        restaurantOrder[0].orderItems.map((order) => {
          if (request.query._id === order.dishId) {
            count++;
            response.json({ code: "SUCCESS", dish, qty: order.quantity });
          }
        });
      }
      if (count === 0) response.json({ code: "SUCCESS", dish, qty: 0 });
    }
  } catch (error) {
    console.log(error);
    response.json({ code: "SOMETHING_WENT_WRONG" });
  }
};

module.exports = getDish;
