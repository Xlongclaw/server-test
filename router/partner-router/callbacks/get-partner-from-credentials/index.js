const generateToken = require("../../../../utils/generateToken");
const partnerModel = require("../../../../database/models/partnerModel");

/**
 * This function sends the userData as response after validating the
 * phoneNumber and password passed as request params.
 *
 * @param {*} request
 * @param {*} response
 */
const getUserFromCredentials = async (request, response) => {
  try{

    /**
     * storing phoneNumber and params got from the request query params.
     */
    const { phoneNumber, password } = request.query;
  
    /**
     * Serching for the partner in the database whose phoneNumber Matches
     * with the request param query phoneNumber.
     */
    const partner = await partnerModel.findOne({ phoneNumber });
  
    /**
     * If the partner with the phone Number is found then comparing the passwords.
     */
    if (partner) {
      if (partner.password === password) {
        /**
         * Generating an authToken for partner so that the partner can stay authenticated.
         */
        const userToken = generateToken(request.query.phoneNumber);
        response.status(200).json({ code: "SUCCESS", partner, userToken });
      } else response.status(400).json({ code: "PASSWORD_DOES_NOT_MATCH" });
    } else response.status(401).json({ code: "PARTNER_DOES_NOT_EXIST" });
  }
  catch(err){
    console.err(err);
    response.status(402).json({ code: "SOMETHING_WENT_WROGN" });
  }
};

module.exports = getUserFromCredentials;
