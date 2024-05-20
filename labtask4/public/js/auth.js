const express = require("express")
const session = require("express-session")
const server = express()

server.use(session({
    secret: "shopomania149",
    resave: false,
    saveUninitialized: false
}))

server.get("/",function(req,res){
    console.log(req.session)
    res.send("Hello session")
});