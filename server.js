require("dotenv").config();
const express = require('express')

/**
 * Router Modules Imports
 */
const baseRouter = require('./router/base-router')
const otpRouter = require('./router/otp-router')


const server = express()

/**
 * Loading Different Router Modules in the Server.
 */
server.use('/',baseRouter);
server.use('/otp',otpRouter);


/**
 * Setting up an Express Listener.
 * Fallback PORT -> 9090
 */
const PORT = process.env.PORT ?? 9090
const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? `{SERVER_ADDRESS}`
server.listen(PORT,function(){
  console.log(`Server is running at -> ${SERVER_ADDRESS}:${PORT}`);
})