const userModel = require("../../../../database/models/userModel");
const verifyToken = require("../../../../utils/verifyToken");

const getBasket = async (request, response) => {
  const tokenData = verifyToken(request.query.userToken);

  if (tokenData.status == "VERIFIED") {
    const data = await userModel
      .findOne(
        {
          phoneNumber: tokenData.data,
        },
      )
      .catch(() => {
        response.status(401).json({ code: "NOT_FOUND" });
      });
      const basket = []
      console.log(data);
      data.basket.forEach(element => {
        if(element.restaurantId===request.query.restaurantId){
          basket.push(element)
        }
      });

    response.status(200).json({ code: "SUCCESS", basket });
  } else {
    response.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = getBasket;
