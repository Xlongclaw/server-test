const express = require('express');
const router = express.Router()
const path = require('path')

/**
 * Handles request sent at `/otp` .
 */
router.get('/',function(request,response){
  response.send("OTP");
})

module.exports = router