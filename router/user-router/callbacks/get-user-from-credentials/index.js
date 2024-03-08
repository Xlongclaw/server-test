const generateToken = require("../../../../utils/generateToken");
const userModel = require("../../../../database/models/userModel");

/**
 * This function sends the userData as response after validating the
 * phoneNumber and password passes as request params.
 *
 * @param {*} request
 * @param {*} response
 */
const getUserFromCredentials = async (request, response) => {
  /**
   * storing phoneNumber and params got from the request query params.
   */
  const { phoneNumber, password } = request.query;

  /**
   * Serching for the user in the database whose phoneNumber Matches
   * with the request param query phoneNumber.
   */
  const user = await userModel.findOne({ phoneNumber });

  /**
   * If the user with the phone Number is found then comparing the passwords.
   */
  if (user) {
    if (user.password === password) {
      /**
       * Generating an authToken for user so that the user can stay authenticated.
       */
      const userToken = generateToken(request.query.phoneNumber);
      response.status(200).json({ code: "SUCCESS", user, userToken });
    } else response.status(400).json({ code: "PASSWORD_DOES_NOT_MATCH" });
  } else response.status(401).json({ code: "USER_DOES_NOT_EXIST" });
};

module.exports = getUserFromCredentials;
