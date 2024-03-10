require("dotenv").config();
const express = require('express')
const connectDatabase = require('./database/connectDatabase')


/**
 * Router Modules Imports
 */
const baseRouter = require('./router/base-router')
const otpRouter = require('./router/otp-router')
const userRouter = require('./router/user-router')
const partnerRouter = require('./router/partner-router')
const restaurantRouter = require('./router/restaurant-router')


const server = express()
server.use(express.json())
/**
 * Loading Different Router Modules in the Server.
 */
server.use('/',baseRouter);
server.use('/otp',otpRouter);
server.use('/user',userRouter)
server.use('/partner',partnerRouter)
server.use('/restaurant',restaurantRouter)

/**
 * Setting up an Express Listener.
 * Fallback PORT -> 9090
 */
const PORT = process.env.PORT ?? 9090
const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? `{SERVER_ADDRESS}`

server.listen(PORT,function(){
  console.log(`Server is running at -> ${SERVER_ADDRESS}:${PORT}`);
  connectDatabase()
})