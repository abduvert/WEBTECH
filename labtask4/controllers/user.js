const bcrypt = require('bcrypt');
const User = require("../models/userModel");

async function handleSignUp(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.redirect("/login"); // Redirect to login page after signup
    } catch (error) {
        console.error("Error in signup:", error);
        return res.render("error", { error: "An error occurred during signup" });
    }
}

async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.render("partials/login", { error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render("partials/login", { error: "Invalid email or password" });
        }

        req.session.user = user; 
        return res.redirect("/stores");
    } catch (error) {
        console.error("Error in login:", error);
        return res.render("error", { error: "An error occurred during login" });
    }
}

async function handleLogout(req,res){
    try {
        req.session.user = null
        res.cookie("connect.sid", "", { expires: new Date(0) });
        res.redirect("/login"); // Redirect to the login page after logout
    } catch (error) {
        console.error("Error in logout:", error);
        return res.render("error", { error: "An error occurred during logout" });
    }
}

module.exports = { handleSignUp, handleLogin, handleLogout };
