const express = require("express");
const router = express.Router();

/**
 * Handles request sent at `/user` .
 */
router.route("/user")
.get(function (request, response) {
  response.send("User")
});

module.exports = router;
