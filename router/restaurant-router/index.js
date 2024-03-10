const express = require("express");
const router = express.Router();
const getPartnerRestaurant = require('./callback/get-partner-restaurant');
const getRestaurantById = require("./callback/get-restaurant-by-id");
const addCategory = require("./callback/add-category");
const getCategory = require("./callback/get-category");
const addDish = require("./callback/add-dish");
const getDish = require("./callback/get-dish");

/**
 * Handles request sent at `/restaurant` .
 */
router.route("/")
.get(getRestaurantById);


router.route('/partner')
.get(getPartnerRestaurant)


router.route('/category')
.post(addCategory)



router.route('/category')
.get(getCategory)


router.route('/dish')
.post(addDish)


router.route('/dish')
.get(getDish)

module.exports = router;
