const userOtpModel = require('../../../../database/models/userOtpModel');
const partnerOtpModel = require('../../../../database/models/partnerOtpModel');
const generateToken = require('../../../../utils/generateToken')

/**
 * This Function compares the user input OTP with the OTP in the 
 * database. 
 * @param {*} request 
 * @param {*} response 
 */
const validateOtp = async function (request,response){

  /**
   * Searching userOtp object in userOtpModel with the phoneNumber
   * provided in the request Params.
   */
  let user = await (async ()=>{
    if(request.query.clientType==="USER") return await userOtpModel.findOne({phoneNumber:request.query.phoneNumber})
    else return await partnerOtpModel.findOne({phoneNumber:request.query.phoneNumber})
  })()
    
  /**
   * If user is found then comparing the OTPs and sendiing a 
   * meaningful response.
   */



  if(user){    
    if(user.otp == request.query.otp){

      /**
       * if OTP matches then authenticating user by generating a JWT token
       * and sendind it with the response.
       */
      try{
        const userToken = generateToken(request.query.phoneNumber)
        response.status(200).json({'code':'SUCCESS',userToken})
      }
      catch(err){
        response.json({'code':'INVALID_PHONE_NUMBER'})
      }
    }  
    else response.status(400).json({'code':'INVALID_OTP'})
  }
  else response.status(401).json({'code':'OTP_EXPIRED'})
}

module.exports = validateOtp