const express = require("express");
const Store = require("../models/storeModel");

const router = express.Router();

// Middleware for using JSON and understanding it
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/stores", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = 3;
    let skip = (page - 1) * pageSize;
    let total = await Store.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    let stores = await Store.find().limit(pageSize).skip(skip);

    res.status(200).json({
      stores,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Fetching a store by id
router.get("/store/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Creating a new store cluster/collection
router.post("/store", async (req, res) => {
  try {
    const store = new Store(req.body);
    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Updating the store variables using its id
router.put("/store/:id", async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Deleting the store using its id
router.delete("/store/:id", async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete(req.params.id);
    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
