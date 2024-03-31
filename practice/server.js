const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.get("/", function (req, res) {
  // Your route handler code
});


mongoose
.connect("mongodb+srv://abduvert:asdf1234@practice.ppwrppr.mongodb.net/NodeAPI?retryWrites=true&w=majority&appName=Practice")
.then(() => {
      app.listen(4000, () => {
        console.log("Node API running");
      });
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
