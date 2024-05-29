const jwt = require("jsonwebtoken");


function restrictToLoggedInUser(targetPage) {
  return function(req, res, next) {
    if (!req.session || !req.session.user) {
      return res.redirect("/login"); 
    }
    res.render(targetPage);
  };
}

async function auth(req, res, next) {
  let cart = [];
  try {
      cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  } catch (e) {
      console.error("Error parsing cart cookie:", e);
      cart = [];
  }

  if (!req.cookies || !req.cookies.cart) {
      res.cookie("cart", JSON.stringify([]), { httpOnly: true });
  }
  res.locals.user = req.session.user;
  res.locals.cart = cart;
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
