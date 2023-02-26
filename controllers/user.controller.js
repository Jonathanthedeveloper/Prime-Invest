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



        // const userData = req.body;

        // {
        //     name: 'user',
        //     email: 'user@email.com',
        //     confirmEmail: 'user@email.com',
        //     password: '123456',
        //     confirmPassword: '123456',
        //     BTCwallet: '',
        //     bankName: '',
        //     bankAddress: '',
        //     accountNumber: '',
        //     sortCode: '',
        //     secretQuestion: '',
        //     secretAnswer: ''
        //   }



        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            secret: {
                question: req.body.secretQuestion,
                answer: req.body.secretAnswer
            },
            account: {
                bitcoinAddress: req.body.BTCwallet,
                bank: {
                    bankName: req.body.bankName,
                    bankAddress: req.body.bankAddress,
                    accountNumber: req.body.accountNumber,
                    sortCode: req.body.sortCode
                }
            },
            wallet: {
                transactions: {}
            }
        }

        // checking if referral exists 
        const referral = await userService.findOne({ userId: req.body.referredBy })
        if (referral){            
            userData.referredBy = referral._id;

        }

        // checking if user already exists
        const userAlreadyExists = await userService.findOne({ email: userData.email });
        if (userAlreadyExists) {
            // throw an errow message saying user already exists
            req.flash('alert', JSON.stringify({ "message": "User already Exists, Please login in", "status": "info" }));
            res.redirect('/user/login')
            return;
        }


        // hashing users password
        const hash = await bcrypt.hash(userData.password, saltRounds);

        // saving it to thier user data object
        userData.password = hash;
        userData.userId = generateUserId()

        const user = await userService.create(userData)

        // adding user to his uplines array
        if (referral) {
            referral.referrals.push(user._id);
            referral.save()
        }



        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });


        res
            .cookie('token', token, { expire: new Date() + 3600000 })
            .header('Authorization', token)
            .redirect('/user/dashboard')

    }

    async loginUser(req, res) {

        const userCredentials = req.body;


        // check if user exists
        const userExists = await userService.findOne({ email: userCredentials.email });
        if (!userExists) {
            // throw an error with incorrect email or password
            req.flash('alert', JSON.stringify({ "message": "Invalid Username or Password", "status": "error" }));
            res.redirect('/user/login')
            console.error("user does not exist");
            return;
        }

        // comparing passwords
        const isCorrectPassword = await bcrypt.compare(userCredentials.password, userExists.password);

        if (!isCorrectPassword) {
            // throw an error with incorrect email or password;
            req.flash('alert', JSON.stringify({ "message": "Invalid Username or Password", "status": "error" }));
            res.redirect('/user/login')
            console.error('incorrect email or password')
            return;
        }

        const token = jwt.sign({ _id: userExists._id, email: userExists.email }, process.env.JWT_SECRET_KEY);
        console.log('login successful')
        res
            .cookie('token', token, { expire: new Date() + 3600000 })
            .header('Authorization', token)
            .redirect('/user/dashboard')

    }

    async logoutUser(req, res) {
        res.clearCookie('token').redirect('/user/login')
    }

    async renderDashboard(req, res) {
        const userInformation = req.user
        return res.render('dashboard', { user: userInformation });
    }

    async renderProfile(req, res) {
        const userInformation = req.user;
        res.render('profile', { user: userInformation })
    }
    async renderReferral(req, res) {
        const userInformation = req.user;
        res.render('referral', { user: userInformation })
    }

    async renderTransaction(req, res) {
        const userInformation = req.user;
        console.log("1", userInformation);

        res.render('history', { user: userInformation })
    }

    async renderLoginPage(req, res) {
        const referral = req.query.ref;
        res.render('create', { referral })
    }

    async handleWithdrawal(req, res) {
        res.render('payment')
    }








}

module.exports = new UserController()