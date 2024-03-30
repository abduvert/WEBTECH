const express = require("express");
const server = express();
const path = require("path");

// Serve static files from the 'public' directory
server.use(express.static("public"));

// Set the view engine to EJS
server.set("view engine", "ejs");

// Render the 'home' view when accessing the root URL
server.get("/", function (req, res) {
  res.render("home");
});

// Serve the 'navbar' partial separately
server.get("/partials/navbar", function(req, res) {
  res.render("partials/navbar");
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
