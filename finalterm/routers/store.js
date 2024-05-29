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

    let mytotal = await Store.countDocuments({ owner: req.session.user._id });
    let total = await Store.countDocuments({ owner: { $ne: req.session.user._id } });

    let mytotalPages = mytotal > 0 ? Math.ceil(mytotal / pageSize) : 1;
    let totalPages = total > 0 ? Math.ceil(total / pageSize) : 1;

    let myStores = await Store.find({ owner: req.session.user._id }).limit(pageSize).skip(skip);
    let stores = await Store.find({ owner: { $ne: req.session.user._id } }).limit(pageSize).skip(skip);

    res.status(200).json({
      stores,
      myStores,
      page,
      mytotalPages,
      totalPages,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/store/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    console.log(store)
    if (!store) {
      return res.status(404).json({ message: `Cannot find store with id ${req.params.id}` });
    }
    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/store/search/:name", async (req, res) => {
  try {
    const name  = req.params.name
    const store = await Store.find({name:{ $regex: `^${name}$`, $options: 'i' }});
    console.log(store)
    if (!store) {
      return res.status(404).json({ message: `Cannot find store with name ${req.params.name}` });
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
