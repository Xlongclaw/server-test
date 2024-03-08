const partnerModel = require('../../../../database/models/partnerModel');
const userOtpModel = require('../../../../database/models/userOtpModel');
const generateRandomNumber = require('../../../../utils/generateRandomNumber');
const textflow = require("textflow.js");

/**
 * This Function sends OTP to a Phone Number.
 * @param {*} request 
 * @param {*} response 
 */
const sendOtpToPhone = async function (request, response) {

  /**
   * Checking if the server Key matches the key Provide in params.
   */
  if (request.query.serverKey == process.env.SERVER_KEY) {

    /**
     * Searching the user in database through phone Number. 
     */
    const user = await partnerModel.findOne({
      phoneNumber: request.query.phoneNumber,
    });

    /**
     * If user exists, then sending response 
     * { code: "USER_EXISTS" }
     * Status code -> 401
     */
    if (user) {
      response.status(401).json({ code: "USER_EXISTS" });
    }

    /**
     * If user does not exist -> 
     * Sending OTP to the phoneNumber in the request params.
     */
    else {
      const OTP = generateRandomNumber(4);
      textflow.useKey(process.env.TEXTFLOW_APIKEY);
      textflow.sendSMS(
        "+91" + request.query.phoneNumber,
        `Your Preofo Verification Code is ${OTP}`
      );

      /**
       * Removing the OTP from the database if exists.
       */
      await userOtpModel.findOneAndDelete({
        phoneNumber: request.query.phoneNumber,
      });

      /**
       * Adding the newly generated OTP to the Database.
       */
      await userOtpModel.create({
        phoneNumber: request.query.phoneNumber,
        otp: OTP,
        expireAt: new Date(),
      });
      response.status(200).json({ code: "SUCCESS" });
    }
  } 
  /**
   * If server Key does not Matches
   */
  else response.status(400).json({ code: "INVALID_SERVER_KEY" });
};

module.exports = sendOtpToPhone;
