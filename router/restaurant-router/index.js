const express = require("express");
const router = express.Router();
const getPartnerRestaurant = require("./callback/get-partner-restaurant");
const getRestaurantById = require("./callback/get-restaurant-by-id");
const addCategory = require("./callback/add-category");
const getCategory = require("./callback/get-category");
const addDish = require("./callback/add-dish");
const getDish = require("./callback/get-dish");
const deleteCategory = require("./callback/delete-category");
const deleteDish = require("./callback/delete-dish");
const editDish = require("./callback/edit-dish");
const setAvailaibility = require("./callback/set-availability");
const getAllRestaurantIds = require("./callback/get-all-restaurant-ids");
const getDishPrice = require("./callback/get-dish-price");
const getDishQuantity = require("./callback/get-dish-quantity");

/**
 * Handles request sent at `/restaurant` .
 */
router.route("/").get(getRestaurantById);

router.route("/ids").get(getAllRestaurantIds)

router.route("/partner").get(getPartnerRestaurant);

router
  .route("/category")
  .get(getCategory)
  .post(addCategory)
  .delete(deleteCategory);

router
  .route("/dish")
  .get(getDish)
  .post(addDish)
  .put(editDish)
  .delete(deleteDish);

  router.route("/dish/price").get(getDishPrice)
  router.route("/dish/qty").get(getDishQuantity)


  router
  .route("/dish/available")
  .post(setAvailaibility)

module.exports = router;