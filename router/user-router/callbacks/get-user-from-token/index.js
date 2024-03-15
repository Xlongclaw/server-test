const userModel = require("../../../../database/models/userModel");
const verifyToken = require("../../../../utils/verifyToken");

/**
 * This function first verifies the userToken, it verified then it sends the
 * user data as response.
 * @param {*} request
 * @param {*} response
 */
const getUserFromToken = async (request, response) => {
  /**
   * Getting Token verification Result in tokenData.
   */
  const tokenData = verifyToken(request.query.userToken);
console.log(tokenData);
  /**
   * If token is verified searching for the user in database and sending
   * back the user data as response.
   */
  if (tokenData.status == "VERIFIED") {
    const data = await userModel
      .find({ phoneNumber: tokenData.data },'name password phoneNumber')
      .catch(() => {
        response.status(401).json({ code: "NOT_FOUND" });
      });
    response.status(200).json({ code: "SUCCESS", data });
  } else {
    response.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = getUserFromToken;
