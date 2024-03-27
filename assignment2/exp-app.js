const express = require("express");
let server = express();

server.use(express.static("public"));
server.set("view engine", "ejs");

server.get("/", function (req, res) {
  res.render("home");
  res.render("partials/navbar");
});

server.listen(3000, () => {
  console.log("Server is running on port 4000");
});
