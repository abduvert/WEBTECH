const express = require("express");
const Store = require("../models/storeModel");
const {verifyToken} = require("../middlewares/auth");

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/stores", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = 3;
    let skip = (page - 1) * pageSize;
    let total = await Store.countDocuments();
    let totalPages = Math.ceil(total / pageSize);
    let stores = await Store.find({owner:req.session.user._id}).limit(pageSize).skip(skip);
    // const stores = await Store.find({owner: req.body.userid });
    res.status(200).json({
      stores,
      page,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

router.post("/store",  async (req, res) => {
  try {
    const userId = req.session.user._id
    const store = new Store({
      name: req.body.name,
      totalProducts: req.body.totalProducts,
      description: req.body.description,
      websiteOrAppLink: req.body.link,
      owner: userId 
    });;
    await store.save();
    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/store/:id", async (req, res) => {
  try {
    const store = await Store.findByIdAndUpdate(
      { _id: req.params.id, owner: req.session.user._id },
       req.body, 
       { new: true, runValidators: true });


    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.statu(500).json({ message: error.message });
  }
});

router.delete("/store/:id",async (req, res) => {
  try {
    const store = await Store.findByIdAndDelete({ _id: req.params.id, owner: req.session.user._id });
    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.delete("/stores",async (req, res) => {
  try {
    const store = await Store.deleteMany({owner: req.session.user._id });
    // const store = await Store.deleteMany({owner: req.body.userid });

    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
