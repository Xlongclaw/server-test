const express = require("express");
const router = express.Router();
const addUser = require('./callbacks/add-user')

/**
 * Handles request sent at `/user` .
 */
router.route("/")
.get(function (request, response) {
  response.send("User")
});

/**
 * Handles request at `/user/add`.
 * 
 * Description : This API verifys that the userToken from the request params
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
 * name -> name of the user going to be regestired.
 * password -> password for the user Account.
 * userToken -> a validation token for  USER.
 * 
 * 
 * Possible Responses : (JSON)
 * { code: "SUCCESS" } && status(200) -> signifies that User is registered successfully.
 * { code: "INVALID_TOKEN" } && status(400) -> The AUTH_TOKEN is not valid.
 */
router.route('/add').post(addUser)


module.exports = router;
