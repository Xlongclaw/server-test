const express = require("express");
const router = express.Router();
const getPartnerFromCredentials = require('./callbacks/get-partner-from-credentials')

/**
 * Handles request sent at `/partner` .
 */
router.route("/").get(getPartnerFromCredentials);

module.exports = router;
