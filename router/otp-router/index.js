const express = require('express');
const router = express.Router()
const sendOtpToPhone = require('./callbacks/send-otp-to-phone')
const validateOtp = require('./callbacks/validate-otp')

/**
 * Handles request sent at `/otp` .
 */
router.get('/',function(request,response){
  response.send("OTP");
})

/**
 * Handles GET request at `/otp/send`.
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

/**
 * Handles GET request at '/otp/validate'
 * 
 * Description : This API compares the otp in the request params with the 
 * one saved in the database when the request is sent at '/otp/send' with the phone number.
 * 
 * Params Required :
 * phoneNumber -> number for which the otp has to be checked.
 * otp -> otp from request params.
 * 
 * Possible Responses : (JSON)
 * { code: "SUCCESS", userToken } && status(200) -> signifies that OTP matches and
 * the userToken contains freshly generated token containing users phoneNumber. this 
 * token is required for the proper authentication of the user.
 * 
 * { code: "INVALID_OTP" } && status(400) -> request params otp does not match with the otp in the database
 * { code: "OTP_EXPIRED" } && status(401) -> the otp entered is expired.
 * 
 */
router.get('/validate',validateOtp)

module.exports = router