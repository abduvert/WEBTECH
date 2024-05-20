const express = require("express");
const mongoose = require("mongoose");
const server = express();
const cors = require("cors");
const path = require("path");
let ejsLayouts = require("express-ejs-layouts");


//routes
const storesRoute = require("./routers/store")
const productsRoute = require("./routers/product")
server.use("/api/",storesRoute)
server.use("/api/",productsRoute)

server.use(express.static("public"));
server.set("view engine", "ejs");
server.use(ejsLayouts);
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


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


mongoose
  .connect("mongodb+srv://abduvert:asdf1234@practice.ppwrppr.mongodb.net/retryWrites=true&w=majority")
.then(() => {
      server.listen(3000, () => {
        console.log("Node API running");

      });
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
