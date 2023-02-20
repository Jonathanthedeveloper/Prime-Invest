require('dotenv').config()
const jwt = require('jsonwebtoken');


// Define middleware to authenticate user with JWT
const authenticate = (req, res, next) => {
    const token = req.headers.cookie.slice(6);
    

    if (!token) {
        // throw an error that something went wrong
        console.error("no token found")
        res.redirect('/login').clearCookie('token');
        return;
    }

    try {
        const decoded =  jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
    }
};

module.exports = authenticate;