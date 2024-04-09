const express = require("express");
const router = express.Router();
const path = require("path");
const getAllAdvertisements = require("./callbacks/get-all-advertisements");
const addAdvertisement = require("./callbacks/add-advertisement");

/**
 * Express router for handling advertisement-related routes.
 * @module advertisementRouter
 */

/**
 * Route serving the home page.
 * @name GET /
 * @function
 * @memberof module:advertisementRouter
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 */
router.route("/").get(function (request, response) {
  response.sendFile(path.join(__dirname, "home.html"));
});

/**
 * Route for getting all advertisements.
 * @name GET /advertisement
 * @function
 * @memberof module:advertisementRouter
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 */
/**
 * Route for adding a new advertisement.
 * @name POST /advertisement
 * @function
 * @memberof module:advertisementRouter
 * @param {Object} request - Express request object.
 * @param {Object} response - Express response object.
 */
router.route("/advertisement")
  .get(getAllAdvertisements)
  .post(addAdvertisement);

module.exports = router;
