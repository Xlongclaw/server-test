/**
 * 
 * This function generate a JWT token with the payload passed
 * as arguments.
 * 
 * @param {string} payload 
 * @returns a freshly generated JWT token.
 */
const generateToken = (payload) => {
  const jwt = require("jsonwebtoken");
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = generateToken