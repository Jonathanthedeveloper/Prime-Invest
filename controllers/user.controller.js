require('dotenv').config()
// const passport = require('passport')
// const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userService = require('../services/user.service');
const { generateUserId } = require('../utils')


class UserController {

    // registering a user 
    async registerUser(req, res) {
        const userData = req.body;
        console.log(userData);


        // checking if user already exists
        const userAlreadyExists = await userService.find({ email: userData.email });
        if (userAlreadyExists) {
            // throw an errow message saying user already exists
            return;
        }


        // hashing users password
        const hash = await bcrypt.hash(userData.password, saltRounds);

        // saving it to thier user data object
        userData.password = hash;
        userData.userId = generateUserId()

        const user = await userService.create(userData)



        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });


        res
            .header('Authorization', token)
            .redirect('/dashboard')

    }

    async loginUser(req, res) {

        const userCredentials = req.body;


        // check if user exists
        const userExists = await userService.find({ email: userCredentials.email });
        if (!userExists) {
            // throw an error with incorrect email or password
            req.flash('alert', JSON.stringify({ "message": "Invalid Username or Password", "status": "error" }));
            res.redirect('/login')
            console.error("user does not exist");
            return;
        }

        // comparing passwords
        const isCorrectPassword = await bcrypt.compare(userCredentials.password, userExists.password);

        if (!isCorrectPassword) {
            // throw an error with incorrect email or password;
            req.flash('alert', JSON.stringify({ "message": "Invalid Username or Password", "status": "error" }));
            res.redirect('/login')
            console.error('incorrect email or password')
            return;
        }

        const token = jwt.sign({ _id: userExists._id, email: userExists.email }, process.env.JWT_SECRET_KEY);
        console.log('login successful')
        res
            .cookie('token', token, { expire: new Date() + 3600000 })
            .header('Authorization', token)
            .redirect('/dashboard')

    }









}

module.exports = new UserController()