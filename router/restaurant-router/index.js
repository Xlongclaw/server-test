const express = require("express");
const router = express.Router();
const getPartnerRestaurant = require('./callback/get-partner-restaurant');
const getRestaurantById = require("./callback/get-restaurant-by-id");

/**
 * Handles request sent at `/restaurant` .
 */
router.route("/")
.get(getRestaurantById);


router.route('/partner')
.get(getPartnerRestaurant)

module.exports = router;
