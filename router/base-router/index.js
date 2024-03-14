const express = require("express");
const router = express.Router();
const path = require("path");
const getAllAdvertisements = require("./callbacks/get-all-advertisements");
const addAdvertisement = require("./callbacks/add-advertisement");

/**
 * Handles request sent at `/` .
 */
router.route("/").get(function (request, response) {
  response.sendFile(path.join(__dirname, "home.html"));
});

router.route("/advertisement")
.get(getAllAdvertisements)
.post(addAdvertisement);

module.exports = router;
