const jwt = require("jsonwebtoken");


async function restrictToLoggedInUser(req, res, next) {
  if (!req.session || !req.session.user) {
      return res.redirect("/login"); 
  }
  res.render("storeslist")
}

async function auth(req,res,next){
  res.locals.user = req.session.user; 
  next(); 
}


function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    
    if (!token) {
      return res.status(403).json({ message: "No token provided" });

    }

    const secretKey = "shopemania149";

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: "Failed to authenticate token" });
        }

        
        req.user = decoded;
        next();
    });
}



module.exports = { restrictToLoggedInUser, auth , verifyToken};
