const sendToUser = require('./send-to-user')
const sendToPartner = require('./send-to-partner')

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
      if(request.query.clientType === 'USER'){
        sendToUser(request,response)
      }
      else{
        sendToPartner(request,response)
      }
    } 
    /**
     * If server Key does not Matches
     */
    else response.status(400).json({ code: "INVALID_SERVER_KEY" });
};

module.exports = sendOtpToPhone;
