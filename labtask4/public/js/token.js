const jwt = require("jsonwebtoken")

function tokenGenerate(user){
    const secret = "shopemania149"
    const token  =jwt.sign(user.name,secret) 
    return token
}

module.exports = tokenGenerate;
