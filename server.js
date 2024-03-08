require("dotenv").config();
const express = require('express')
const baseRouter = require('./router/base-router')

const server = express()
server.use('/',baseRouter)


const PORT = process.env.PORT ?? 9090
const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? `{SERVER_ADDRESS}`
server.listen(PORT,function(){
  console.log(`Server is running at -> ${SERVER_ADDRESS}:${PORT}`);
})