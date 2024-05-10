const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const app = express();
app.use(express.json());
app.use(cors());

const products = require("./products"); // Importing products array

function findProductById(id) {
    return products.find(product => product.id === id);
}

function generateProductId() {
    const id = (products.length + 1).toString().padStart(3, '0');
    if (products.find(product => product.id === id)) {
        // If the generated ID already exists, recursively call the function to generate a new one
        return generateProductId();
    }
    return id;
}

app.get("/products", function (req, res) {
    res.json(products);
});

app.get("/products/:id", function (req, res) {
    const product = findProductById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.post("/products", function (req, res) {
    const { product, company } = req.body;
    const id = generateProductId();
    const newProduct = { id, product, company };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put("/products/:id", function (req, res) {
    const id = req.params.id;
    const { product, company } = req.body;
    const index = products.findIndex(p => p.id === id);
    
    if (index !== -1) {
        if (product) products[index].product = product;
        if (company) products[index].company = company;
        res.json(products[index]);
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.delete("/products/:id", function (req, res) {
    const id = req.params.id;
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ error: "Product not found" });
    }
});

app.listen(5000, function () {
    console.log("Server is running on port 5000");
});
