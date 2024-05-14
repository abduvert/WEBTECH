const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors"); // Import the CORS middleware
app.use(cors())

//import my model for the stores
const Store = require("../models/api/storeslist") 

//middleware for using json and understanding it
app.use(express.json())
//middleware for allowing data of other forms instead of json to update data
app.use(express.urlencoded({extended:false}))


//fetching all the stores
app.get("/stores", async function (req, res) {
  try {
    const stores = await Store.find();
    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//fetching a store by id
app.get("/store/:id", async function (req, res) {
  try {
    const store = await Store.findById(req.params.id);
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//creating a new store cluster/collection
app.post("/store",async function(req,res){
    try {
      const store  = await Store.create(req.body)
      res.status(201).json(store)
    } catch (error) {
      res.status(500).json({message: error.mesage})
    }
});


//updating the store variables using its id
app.put("/stores/:id", async function (req, res) {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id,req.body);
    
    if(!store){
      res.status(404).json({message:`we cannot find product by id ${req.params.id}`})
    }

    //to send the updated data we use findbyid again
    const updatedStore = await Store.findById(req.params.id)
    res.status(200).json(updatedStore);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Deleting the store using its id
app.delete("/stores/:id", async function (req, res) {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    
    if(!store){
      res.status(404).json({message:`we cannot find product by id ${req.params.id}`})
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb+srv://abduvert:asdf1234@practice.ppwrppr.mongodb.net/listofStores?retryWrites=true&w=majority")
.then(() => {
      app.listen(2000, () => {
        console.log("Node API running");

      });
    console.log("Connected to the Database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
