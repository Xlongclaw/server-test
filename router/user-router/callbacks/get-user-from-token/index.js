const userModel = require("../../../../database/models/userModel");
const verifyToken = require("../../../../utils/verifyToken");

/**
 * This function first verifies the userToken, it verified then it returns the
 * user data.
 * @param {*} request
 * @param {*} response
 */
const getUserFromToken = async (request, response) => {
  /**
   * Getting Token verification Result in tokenData.
   */
  const tokenData = verifyToken(req.query.userToken);

  /**
   * If token is verified searching for the user in database and sending
   * back the user data as response.
   */
  if (tokenData.status == "VERIFIED") {
    const data = await userModel
      .find({ phoneNumber: tokenData.data })
      .catch(() => {
        res.status(401).json({ code: "NOT_FOUND" });
      });
    res.status(200).json({ code: "SUCCESS", data });
  } else {
    res.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = getUserFromToken;
