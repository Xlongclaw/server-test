const express = require("express");
const router = express.Router();
const path = require("path");

/**
 * Handles request sent at `/` .
 */
router.route("/")
.get(function (request, response) {
  response.sendFile(path.join(__dirname, "home.html"));
});

module.exports = router;
