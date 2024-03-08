const userModel = require("../../../../database/models/userModel");
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
const addUser = async (request, response) => {

  /**
   * Verifying the token by passing it in verifyToken function.
   */
  const tokenData = verifyToken(request.body.userToken);

  /**
   * If the token Verification is successful addind user data to the 
   * database.
   */
  if (tokenData.status == "VERIFIED") {
    await userModel.create({
      name: request.body.name,
      password: request.body.password,
      phoneNumber: tokenData.data,
    });
    response.status(200).json({ code: "SUCCESS" });
  } else {
    response.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = addUser;
