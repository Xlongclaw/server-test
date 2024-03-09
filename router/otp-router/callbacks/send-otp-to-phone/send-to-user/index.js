const userModel = require('../../../../../database/models/userModel');
const userOtpModel = require('../../../../../database/models/userOtpModel');
const generateRandomNumber = require('../../../../../utils/generateRandomNumber');
const textflow = require("textflow.js");

const sendToUser = async (request,response) =>{
  
    /**
     * Searching the user in database through phone Number. 
     */
    const user = await userModel.findOne({
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

module.exports = sendToUser