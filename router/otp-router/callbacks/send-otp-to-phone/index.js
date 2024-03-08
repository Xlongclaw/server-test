const sendOtpToPhone = async function (request, response) {
  if (request.query.serverKey == process.env.SERVER_KEY) {
    const user = await partnerModel.findOne({
      phoneNumber: request.query.phoneNumber,
    });
    if (user) {
      response.status(401).json({ code: "USER_EXISTS" });
    } else {
      const OTP = generateRandomNumber(4);
      textflow.sendSMS(
        "+91" + request.query.phoneNumber,
        `Your Preofo Verification Code is ${OTP}`
      );
      await userOtpModel.findOneAndDelete({
        phoneNumber: request.query.phoneNumber,
      });
      await userOtpModel.create({
        phoneNumber: request.query.phoneNumber,
        otp: OTP,
        expireAt: new Date(),
      });
      response.status(200).json({ code: "SUCCESS" });
    }
  } else response.status(400).json({ code: "INVALID_SERVER_KEY" });
};

module.exports = sendOtpToPhone;
