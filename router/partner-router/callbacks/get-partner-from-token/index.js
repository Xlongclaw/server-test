const partnerModel = require("../../../../database/models/partnerModel");
const verifyToken = require("../../../../utils/verifyToken");

/**
 * This function first verifies the userToken, it verified then it sends the
 * partner data as response.
 * @param {*} request
 * @param {*} response
 */
const getPartnerFromToken = async (request, response) => {
  /**
   * Getting Token verification Result in tokenData.
   */
  const tokenData = verifyToken(request.query.userToken);

  /**
   * If token is verified searching for the partner in database and sending
   * back the partner data as response.
   */
  if (tokenData.status == "VERIFIED") {
    const data = await partnerModel
      .find({ phoneNumber: tokenData.data })
      .catch(() => {
        response.status(401).json({ code: "NOT_FOUND" });
      });
    response.status(200).json({ code: "SUCCESS", data });
  } else {
    response.status(400).json({ code: "INVALID_TOKEN" });
  }
};

module.exports = getPartnerFromToken;
