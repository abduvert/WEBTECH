const express = require("express");
const { handleSignUp, handleLogin, handleLogout } = require("../controllers/user"); 
const userRouter = express.Router();

userRouter.post("/signup", handleSignUp);
userRouter.post("/login", handleLogin);
userRouter.post("/logout", handleLogout);

module.exports = userRouter;
