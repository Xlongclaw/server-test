const express = require('express');
const router = express.Router()
const sendOtpToPhone = require('./callbacks/send-otp-to-phone')

/**
 * Handles request sent at `/otp` .
 */
router.get('/',function(request,response){
  response.send("OTP");
})

/**
 * Handles request at `/otp/send`.
 * 
 * Description : This API sends an OTP to the requested Phone Number and also strores the 
 * same otp in the Databse.
 * 
 * Params Required :
 * phoneNumber -> number to which the otp has to be sent.
 * serverKey -> Key to access server.
 * clientType -> "USER" OR "PARTNER" depanding on who is sending the request.
 * 
 * Possible Responses : (JSON)
 * { code: "SUCCESS" } && status(200) -> signifies that OTP is sent successfully.
 * { code: "INVALID_SERVER_KEY" } && status(400) -> serverKey does not match.
 * { code: "USER_EXISTS" } && status(401) -> signifies User already exists in the database.
 */
router.get('/send',sendOtpToPhone)

module.exports = router