async function restrictToLoggedInUser(req, res, next) {
  if (!req.session || !req.session.user) {
      return res.redirect("/login"); // Redirect to the login page if user is not logged in
  }
  res.render("storeslist")
}

async function auth(req,res,next){
  res.locals.user = req.session.user; // Set the user object in res.locals
  next(); // Proceed to the next middleware
}

module.exports = { restrictToLoggedInUser, auth };
