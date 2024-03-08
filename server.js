const express = require('express')
require("dotenv").config();

const server = express()


const PORT = process.env.PORT ?? null
const SERVER_ADDRESS = process.env.SERVER_ADDRESS ?? `{SERVER_ADDRESS}`
server.listen(PORT,function(){
  console.log(`Server is running at -> ${SERVER_ADDRESS}:${PORT}`);
})