const partnerModel = require("../../../../database/models/partnerModel");
const restaurantModel = require("../../../../database/models/restaurantModel");
const verifyToken = require("../../../../utils/verifyToken");

/**
 * This Callback function accepts request and response at an api.
 * It verifys the token got from request Params and sends a meaningful response.
 * If the userToken is valid , then it adds the user in the database with name,password,phoneNumber
 * sent through request params.
 *
 * @param {*} request
 * @param {*} response
 */
const addPartner = async (request, response) => {
  /**
   * Verifying the token by passing it in verifyToken function.
   */
  const tokenData = verifyToken(request.body.userToken);

  /**
   * If the token Verification is successful addind user data to the
   * database.
   */
  if (tokenData.status == "VERIFIED") {
    console.log(JSON.stringify(request.body));
    const {
      address,
      description,
      foodTags,
      restaurantTags,
      minPrepTime,
      maxPrepTime,
      name,
      images,
    } = request.body.restaurantData;

    await restaurantModel.create({
      address,
      description,
      foodTags,
      images,
      restaurantTags,
      name,
      maxPrepTime,
      minPrepTime,
      rating: 0,
      foodCategoryIds: [],
      isOpen: false,
    }).then((res)=>console.log(res))


    await partnerModel.create({
      name: request.body.name,
      password: request.body.password,
      phoneNumber: tokenData.data,
      restaurantId:''
    });
    response.status(200).json({ code: "SUCCESS" });
  } else {
    response.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = addPartner;
