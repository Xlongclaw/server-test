const express = require("express");
const router = express.Router();
const getPartnerFromCredentials = require('./callbacks/get-partner-from-credentials')
const addPartner = require('./callbacks/add-partner')

/**
 * Handles request sent at `/partner` .
 */
router.route("/").get(getPartnerFromCredentials);



/**
 * Handles request sent at `/partner/add` .
 */
router.route("/add").post(addPartner);


module.exports = router;
