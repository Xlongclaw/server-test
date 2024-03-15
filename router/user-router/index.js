const express = require("express");
const router = express.Router();
const addUser = require('./callbacks/add-user')
const getUserFromToken = require('./callbacks/get-user-from-token')
const getUserFromCredentials = require('./callbacks/get-user-from-credentials');
const addToBasket = require("./callbacks/add-to-basket");
const getBasket = require("./callbacks/get-basket");


/**
 * Handles GET request at `/user`.
 * 
 * Description : This API sends userData through verifying the phoneNumber and password.
 * 
 * Params Required:
 * {
 *    name:"USERNAME",
 *    password:"USER_PASSWORD",  
 * }
 * 
 * phoneNumber -> number of the user.
 * password -> password for the user Account.
 * 
 * Possible Responses : (JSON)
 * { code: "SUCCESS", user, userToken } && status(200) -> The User phoneNumber and password matches
 * user -> Data of the user.
 * userToken -> token Required for login session.
 * 
 * { code: "PASSWORD_DOES_NOT_MATCH" } && status(401) -> User found but the password does not match.
 * { code: "USER_DOES_NOT_EXIST" } && status(401) -> The user with the phoneNumber does not exist in the database
 */
router.route("/").get(getUserFromCredentials);

/**
 * Handles POST request at `/user/add`.
 * 
 * Description : This API verifies that the userToken from the request params
 *  and adds the user if the token verification is successful.
 * 
 * Body Required:
 * {
 *    phoneNumber:"USER_PHONE_NUMBER",
 *    name:"USERNAME",
 *    password:"USER_PASSWORD",
 *    userToken:"AUTH_TOKEN"
 * }
 * 
 * phoneNumber -> number of the user going to be registered.
 * password -> password for the user Account.
 * name -> name of the user going to be regestired.
 * userToken -> a validation token for  USER.
 * 
 * 
 * Possible Responses : (JSON)
 * { code: "SUCCESS" } && status(200) -> signifies that User is registered successfully.
 * { code: "INVALID_TOKEN" } && status(400) -> The AUTH_TOKEN is not valid.
 */
router.route('/add').post(addUser)


/**
 * Handles GET request at `/user/token`.
 * 
 * Description : This API sends userData through verifying the userToken
 * got from request params.
 * 
 * Params Required:
 * {
 *    userToken:"AUTH_TOKEN"
 * }
 * 
 * userToken -> a validation token for USER.
 * 
 * Possible Responses : (JSON)
 * { code: "SUCCESS",data } && status(200) -> The User token is valid and also the user exists in the database.
 * data - Data of the user.
 * 
 * { code: "NOT_FOUND" } && status(401) -> userToken is verified but the user with the token data does not exists.
 * { code: "INVALID_TOKEN" } && status(400) -> The token is not valid.
 */
router.route('/token').get(getUserFromToken)






router.route('/basket').post(addToBasket).get(getBasket)

module.exports = router;
