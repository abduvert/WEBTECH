const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// Fetching all the products
router.get("/products", async (req, res) => {
    const { storeId } = req.query;

    if (!storeId) {
        return res.status(400).json({ message: "storeId is required" });
    }
    
    try {
        const products = await Product.find({store:storeId});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetching a product by id
router.get("/products/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find product with id ${req.params.id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Creating a new product
router.post("/products", async (req, res) => {
    // const { name, description, color, price, company, storeId } = req.body;


    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ message: error.message });
    }
});
// Updating a product by id
router.put("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: `Cannot find product with id ${req.params.id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Deleting a product by id
router.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find product with id ${req.params.id}` });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
