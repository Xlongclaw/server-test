const express = require("express");
const router = express.Router();
const getPartnerFromCredentials = require('./callbacks/get-partner-from-credentials')
const getPartnerFromToken = require('./callbacks/get-partner-from-token')
const addPartner = require('./callbacks/add-partner')

/**
 * Handles request sent at `/partner` .
 */
router.route("/").get(getPartnerFromCredentials);



/**
 * Handles request sent at `/partner/add` .
 */
router.route("/add").post(addPartner);


/**
 * Handles request sent at `/partner/token` .
 */
router.route("/token").get(getPartnerFromToken);

module.exports = router;
