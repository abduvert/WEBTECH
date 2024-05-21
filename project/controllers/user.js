const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const tokenGenerate = require("../public/js/token"); 


async function handleSignUp(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send('<script>alert("All fields are required."); window.location.href = "/signup";</script>');
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send('<script>alert("A user with this email already exists."); window.location.href = "/signup";</script>');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword
        });

        return res.send('<script>alert("Signup successful! Please log in."); window.location.href = "/login";</script>'); // Redirect to login page after signup
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).send('<script>alert("An error occurred during signup. Please try again later."); window.location.href = "/signup";</script>');
    }
}


async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('<script>alert("Email and password are required."); window.location.href = "/login";</script>');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('<script>alert("Invalid email or password."); window.location.href = "/login";</script>');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('<script>alert("Invalid email or password."); window.location.href = "/login";</script>');
        }

        req.session.user = user;
        res.locals.user = req.session.user;
        const token = tokenGenerate(user);
        console.log(token);
        // res.cookie("token", token, { httpOnly: true });

        
        return res.redirect("/stores"); 
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).send('<script>alert("An error occurred during login. Please try again later."); window.location.href = "/login";</script>');
    }
}

async function handleLogout(req, res) {
    try {
        // res.cookie("token", "", { expires: new Date(0) });
        req.session.user = null;
        res.cookie("connect.sid", "", { expires: new Date(0) });
        res.redirect("/login"); 
    } catch (error) {
        console.error("Error in logout:", error);
        return res.status(500).render("error", { error: "An error occurred during logout" });
    }
}

module.exports = { handleSignUp, handleLogin, handleLogout };
