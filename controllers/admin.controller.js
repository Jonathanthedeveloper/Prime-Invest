const AdminService = require('../services/admin.service');
const userService = require('../services/user.service');
const depositService = require('../services/deposit.service');
const transactionService = require('../services/transaction.service');
const { User } = require('../models/user.model');
const { referralEarningPercent } = require('../config');
const sendMail = require('../utils/mail.util');



class AdminController {

    async renderAdminDashboard(req, res) {
        // fetching user data
        const transactions = await transactionService.findAll({});
        const users = await userService.findAll({});

        // console.log(transactions);

        const deposits = transactions.filter(transaction => {
            return transaction.type === "deposit" && transaction.status === "successful"
        })
        const withdrawals = transactions.filter(transaction => transaction.type === "withdrawal" && transaction.status === "successful")
        const investments = transactions.filter(transaction => transaction.type === "investment" && transaction.status === "successful")
        const earnings = transactions.filter(transaction => transaction.type === "earning" && transaction.status === "successful")

        const pendings = transactions.filter(transaction => transaction.status === "pending")
        const successfuls = transactions.filter(transaction => transaction.status === "successful")




        res.render('adminDashboard', { users, deposits, withdrawals, investments, earnings, pendings, transactions })
    }

    async renderAdminDeposit(req, res) {
        const transactions = await transactionService.findAll({});
        const deposits = transactions.filter(transaction => {
            return transaction.type === "deposit"
        });

        deposits.sort((a, b) => b.createdAt - a.createdAt)

        res.render('adminDeposit', { deposits })
    }

    async renderAdminWithdrawal(req, res) {
        const transactions = await transactionService.findAll({});
        const withdrawals = transactions.filter(transaction => {
            return transaction.type === "withdrawal"
        })

        withdrawals.sort((a, b) => b.createdAt - a.createdAt);
        res.render('adminWithdraw', { withdrawals })
    }

    async handleApproval(req, res) {
        const { id, approve } = req.body;
        const status = approve === "confirm" ? "successful" : "failed";
        const transaction = await transactionService.update({ _id: id }, { status });

        sendMail({ type: transaction.type, to: transaction.user.email })

        if (transaction.type === 'deposit') {
            // console.log("REF =>", transaction.user.referredBy)
            if (transaction.user.referredBy) {
                const referralEarnings = {
                    from: transaction.user._id,
                    user: transaction.user.referredBy,
                    type: "referral earnings",
                    status: "successful",
                    amount: referralEarningPercent * transaction.amount,
                }

                const refEarnings = await transactionService.create(referralEarnings);
                await User.findByIdAndUpdate(transaction.user.referredBy, { $push: { earnings: refEarnings._id } });
            }


            res.redirect('/user/admin/deposit')
        } else if (transaction.type === 'withdrawal') {
            res.redirect('/user/admin/withdraw')
        }
    }

    async renderReferrals(req, res) {

        const users = await User.find({}).populate('referredBy')

        const referredUsers = users.filter(user => user.referredBy)

        // res.send(referredUsers)

        res.render('adminRefer', { referredUsers })
    }

    async renderAdminUsers(req, res) {
        const users = await User.find({}).populate('referredBy')




        res.render('adminUser', { users })
    }

    async renderAdminUsersProfile(req, res) {
        const user = await userService.findOne({ _id: req.params.user })
        res.render('adminPersonalProfile', { user });
    }

    async handlePayouts(req, res) {

        // transactionService.updateMany({}, updateData)
        // res.send("success")
    }

}


module.exports = new AdminController
