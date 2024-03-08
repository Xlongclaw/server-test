const express = require("express");
const router = express.Router();

/**
 * Handles request sent at `/restaurant` .
 */
router.route("/restaurant")
.get(function (request, response) {
  response.send("RESTAURANT")
});

module.exports = router;
