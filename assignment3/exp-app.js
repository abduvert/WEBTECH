const express = require("express");
const server = express();
const path = require("path");
let ejsLayouts = require("express-ejs-layouts");

server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(ejsLayouts);


server.get("/", function (req, res) {
  res.render("home");
});

server.get("/partials/navbar", function(req, res) {
  res.render("partials/navbar");
});


server.get("/partials/footer", function(req, res) {
  res.render("partials/footer");
});


server.get("/partials/store", function(req, res) {
  res.render("partials/storeNav");
});


server.get("/crud", function(req, res) {
  res.render("crud");
});


server.get("/contact", function(req, res) {
  res.render("contact");
});


server.get("/stores", function(req, res) {
  res.render("storeslist");
});


server.get("/store", function(req, res) {
  res.render("storeHome");
});


server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
