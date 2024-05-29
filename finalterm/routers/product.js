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
        if (!req.session.visited) {
            req.session.visited = [];
        }
        if (!req.session.visited.includes(req.params.id)) {
            req.session.visited.push(req.params.id);
        }
        res.render("partials/singleProduct",{product})
        // res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/visitedProducts", async (req, res) => {
    try {
        if (!req.session.visited || req.session.visited.length === 0) {
            return res.status(200).json([]);
        }
        const products = await Product.find({
            '_id': { $in: req.session.visited }
        });

        res.status(200).json(products);
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


router.get("/add-to-cart/:id", (req, res) => {
    let cart = [];
    try {
        cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
    } catch (e) {
        console.error("Error parsing cart cookie:", e);
        cart = [];
    }

    const productId = req.params.id;

    // Check if the product is already in the cart
    if (!cart.includes(productId)) {
        cart.push(productId); // Add the product ID to the cart if it's not already there
    }

    res.cookie("cart", JSON.stringify(cart), { httpOnly: true });
    return res.sendStatus(200);
});



//final term featured
router.get("/featuredAll", async (req, res) => {
    try {
        const products = await Product.find({ isFeatured: true });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
