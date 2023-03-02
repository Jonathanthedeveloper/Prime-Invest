require('dotenv').config()
// const passport = require('passport')
// const LocalStrategy = require('passport-local');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userService = require('../services/user.service');
const AdminService = require('../services/admin.service')
const { generateUserId } = require('../utils/utils')
const sendMail = require('../utils/mail.util')
const transactionService = require('../services/transaction.service');


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

        // if(!req.body.role) return console.log(req.body.role)

        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            secret: {
                question: req.body.secretQuestion,
                answer: req.body.secretAnswer
            },
            role: req.body.role || 'user',
            account: {
                bitcoinAddress: req.body.BTCwallet,
                bank: {
                    bankName: req.body.bankName,
                    bankAddress: req.body.bankAddress,
                    accountNumber: req.body.accountNumber,
                    sortCode: req.body.sortCode
                }
            },
            withdrawals: [],
            deposits: [],
            investments: [],
            earnings: []
        }

        // checking if referral exists 
        const referral = await userService.findOne({ userId: req.body.referredBy })
        if (referral) {
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
            await referral.save()
        }

        // const admin = await AdminService.findAll({})
        // admin.users.push(user._id);
        // await admin.save()



        const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });




        sendMail({
            to: user.email,
            subject: 'Welcome',
            text: "WE SEE you have registered"
        })

        res
            .cookie('token', token, { expire: new Date() + 3600000 })
            .header('Authorization', token)
            .redirect('/user/dashboard')

    }

    async loginUser(req, res) {

        const userCredentials = req.body;


        // check if user exists
        const foundUser = await userService.findOne({ email: userCredentials.email });
        if (!foundUser) {
            // throw an error with incorrect email or password
            req.flash('alert', JSON.stringify({ "message": "Invalid Username or Password", "status": "error" }));
            res.redirect('/user/login')
            console.error("user does not exist");
            return;
        }

        // comparing passwords
        const isCorrectPassword = await bcrypt.compare(userCredentials.password, foundUser.password);

        if (!isCorrectPassword) {
            // throw an error with incorrect email or password;
            req.flash('alert', JSON.stringify({ "message": "Invalid Username or Password", "status": "error" }));
            res.redirect('/user/login')
            console.error('incorrect email or password')
            return;
        }

        const token = jwt.sign({ _id: foundUser._id, email: foundUser.email, role: foundUser.role }, process.env.JWT_SECRET_KEY);
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
        console.log(userInformation);
        if (userInformation.role === 'admin') {
            return res.redirect('/user/admin')
        }


        const deposits = userInformation.deposits.filter(deposit => deposit.type === "success")

        const withdrawals = userInformation.withdrawals.filter(withdrawal => withdrawal.type === "success")

        const investments = userInformation.investments.filter(investment => investment.type === "success")

        const earnings = userInformation.earnings.filter(earning => earning.type === "success")

        return res.render('dashboard', { user: userInformation, deposits, withdrawals, investments, earnings });
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

        // console.log(userInformation);


        const transactions = [...userInformation.withdrawals, ...userInformation.deposits, ...userInformation.earnings, ...userInformation.investments]

        transactions.sort((a, b) => a.createdAt - b.createdAt)


        res.render('history', { transactions })
    }

    async renderLoginPage(req, res) {
        const referral = req.query.ref;
        const { role } = req.query
        // if(!role) return console.log('user')
        res.render('create', { referral, role })
    }

    async handleWithdrawal(req, res) {
        try {
            const transactionData = {
                user: req.user._id,
                type: 'withdrawal',
                amount: req.body.amount,
                account: {
                    walletType: req.body.wallet,
                    address: req.body.address
                }
            }

            const withdrawal = await transactionService.create(transactionData);
            const user = await userService.findOne({ _id: req.user._id })
            user.withdrawals.push(withdrawal._id)
            await user.save()

            console.log(user)

            req.flash('status', 'success');
            res.redirect('/user/withdraw')
        }
        catch (error) {
            req.flash('status', 'fail')
            res.redirect('/user/withdraw')
        }
    }

    async handleDeposit(req, res) {

        try {
            // const transactionData = {
            //     user: req.user._id,
            //     type: 'deposit',
            //     amount: req.body.amount,
            //     medium: req.body.medium
            // }


            // const transaction = await transactionService.create(transactionData);
            // const user = await userService.findOne({ _id: req.user._id })

            // user.deposits.push(transaction._id)
            // await user.save()


            res.render('checkout', { amount: req.body.amount, medium: req.body.medium, wallet: "48924294242894729" });


        } catch (error) {
            req.flash('status', 'fail')
            res.redirect('/user/deposit')
        }

    }

    async handleCheckout(req, res) {
        try {

            if (req.body.action === 'cancel') {
                return res.redirect('/user/dashboard')
            }

            const transactionData = {
                user: req.user._id,
                type: 'deposit',
                amount: req.body.amount,
                medium: req.body.medium,
                transactionID: req.body.transactionID
            }

            const deposit = await transactionService.create(transactionData)
            const user = await userService.findOne({ _id: req.user._id })
            user.deposits.push(deposit._id)
            await user.save()

            req.flash('status', 'success')
            res.redirect('/user/deposit')




        } catch (error) {
            req.flash('status', 'fail')
            res.redirect('/user/checkout')
        }
    }


    async handleInvestment(req, res) {
        try {


            if (req.body.amount > req.user.balance) {
                return res.redirect('/user/deposit')
            }

            const transactionData = {
                user: req.user._id,
                type: 'investment',
                amount: req.body.amount,
                plan: req.body.plan
            }

            const investment = await transactionService.create(transactionData);
            const user = await userService.findOne({ _id: req.user._id })
            user.investments.push(investment._id)
            await user.save()

            req.flash('status', 'success');
            res.redirect('/user/invest')


        } catch (error) {
            req.flash('status', 'fail')
            res.redirect('/user/invest')
        }
    }







}

module.exports = new UserController()