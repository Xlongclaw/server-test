require("dotenv").config();
const express = require('express')
const connectDatabase = require('./database/connectDatabase')
const WebSocket = require('ws')

/**
 * Router Modules Imports
 */
const baseRouter = require('./router/base-router')
const otpRouter = require('./router/otp-router')
const userRouter = require('./router/user-router')
const partnerRouter = require('./router/partner-router')
const restaurantRouter = require('./router/restaurant-router');
const dishModel = require("./database/models/dishModel");
const partnerModel = require("./database/models/partnerModel");


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

const httpServer = server.listen(PORT,function(){
  console.log(`Server is running at -> ${SERVER_ADDRESS}:${PORT}`);
  connectDatabase()
})

const wss = new WebSocket.Server({noServer:true})


httpServer.on('upgrade',(req,socket,head)=>{
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req)
  })
})






wss.on('connection', async(ws,request)=>{
  try {
    const routes = request.url.split("/");
    const partner = await partnerModel.findOne({
      phoneNumber: routes[1],
      password: routes[2],
    });
    if (partner) {
      ws.send(
        `Hello, ${partner.name} I am a Web Socket Server and I will tell u when the database data changes.`
      );
      console.log(request.url);
      dishModel.watch().on("change", (data) => {
        console.log(data);
        ws.send(
          JSON.stringify({
            code: "CHANGED",
            _id: data.documentKey._id,
          })
        );
      });
    } else {
      ws.send("Please Register to Preofo First or Check your Password");
    }
  } catch (error) {
    console.log(error);
  }
})
