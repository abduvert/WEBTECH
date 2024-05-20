const jwt = require("jsonwebtoken")

//token generation
function tokenGenerate(user){
    const payload = {
        id: user.id,
        name: user.name
    };

    const secretKey = "shopemania149"
    const options = {expiresIn: "4h"}
    return jwt.sign(payload,secret,options) 
}