const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const { restrictToLoggedInUser , auth,verifyToken} = require("./middlewares/auth");
const cors = require("cors");
const ejsLayouts = require("express-ejs-layouts");

const server = express();
server.use(express.urlencoded({ extended: false }));

// Middleware
server.use(cors());
server.use(session({
    secret: "shopomania149",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
server.use(auth);
server.use(express.json());
server.use(cookieparser());
server.use(express.static("public"));
server.use(ejsLayouts);
server.set("view engine", "ejs");

// Routes
const storesRoute = require("./routers/store");
const productsRoute = require("./routers/product");
const userRouter = require("./routers/user");

server.use("/api/",storesRoute);
server.use("/api/", productsRoute);
server.use("/user/", userRouter);

server.get("/", (req, res) => {
    res.render("home");
});

server.get("/partials/navbar", (req, res) => {
    res.render("partials/navbar");
});

server.get("/partials/footer", (req, res) => {
    res.render("partials/footer");
});

server.get("/partials/store", (req, res) => {
    res.render("partials/storeNav");
});

server.get("/crud", (req, res) => {
    res.render("crud");
});

server.get("/contact", (req, res) => {
    res.render("contact");
});

server.get("/register", (req, res) => {
    res.render("signup");
});

server.get("/stores", restrictToLoggedInUser("storeslist"),(req, res) => {
    
    res.render("storeslist");
});

server.get("/store", restrictToLoggedInUser("storeHome"), (req, res) => {
    res.render("storeHome");
});

server.get("/login", (req, res) => {
    res.render("partials/login");
});

server.get("/storeForm", restrictToLoggedInUser("addStoreForm"),(req, res) => {
    res.render("addStoreForm");
});

server.get("/productForm",restrictToLoggedInUser("addProductForm"), (req, res) => {
    res.render("addProductForm");
});


server.listen(3000, () => {
    console.log("Node API running on port 3000");
});

// Database Connection and Server Start
mongoose.connect("mongodb+srv://abduvert:asdf1234@practice.ppwrppr.mongodb.net/listofStores?retryWrites=true&w=majority")
    .then(() => {
       
        console.log("Connected to the Database");
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });
