const userModel = require("../../../../database/models/userModel");
const verifyToken = require("../../../../utils/verifyToken");

const addToBasket = async (request, response) => {
  const tokenData = verifyToken(request.body.userToken);
  if (tokenData.status == "VERIFIED") {

    await userModel.updateOne(
      {
        phoneNumber: tokenData.data,
      },
      {
        $pull:{basket:{restaurantId:request.body.order.restaurantId}},
      })
    await userModel.updateOne(
      {
        phoneNumber: tokenData.data,
      },
      {
        $push: { basket: request.body.order },
      }
    );
    response.status(200).json({ code: "SUCCESS" });
  } else {
    response.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = addToBasket;
