
const generateRandomNumber = (n) =>{
  return ("" + Math.random()).substring(2, n+2)
}

module.exports = generateRandomNumber