const express = require("express");
const server = express();
const path = require("path");

server.use(express.static("public"));
server.set("view engine", "ejs");

server.get("/", function (req, res) {
  res.render("home");
});

server.get("/partials/navbar", function(req, res) {
  res.render("partials/navbar");
});


server.get("/crud", function(req, res) {
  res.render("crud");
});


server.get("/contact", function(req, res) {
  res.render("contact");
});


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
