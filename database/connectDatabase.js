const mongoose = require('mongoose')

const connectDatabase = () =>{
  mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Mongo Database connection successful.")
  })
}

module.exports = connectDatabase  