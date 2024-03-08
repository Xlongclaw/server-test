const express = require("express");
const router = express.Router();

/**
 * Handles request sent at `/partner` .
 */
router.route("/partner")
.get(function (request, response) {
  response.send("PARTNER")
});

module.exports = router;
