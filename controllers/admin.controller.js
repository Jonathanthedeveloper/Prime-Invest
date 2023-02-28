const AdminService = require('../services/admin.service');
const userService = require('../services/user.service');
const depositService = require('../services/deposit.service');
const transactionService = require('../services/transaction.service')



class AdminController {

    async renderAdminDashboard(req, res) {
        // fetching user data
        const transactions = await transactionService.findAll({});
        const users = await userService.findAll({});

        // console.log(transactions);

        const deposits = transactions.filter(transaction => {
            return transaction.type === "deposit" && transaction.status === "success"
        })
        const withdrawals = transactions.filter(transaction => transaction.type === "withdrawal" && transaction.status === "success")
        const investments = transactions.filter(transaction => transaction.type === "investment" && transaction.status === "success")
        const earnings = transactions.filter(transaction => transaction.type === "earning" && transaction.status === "success")
        console.log(withdrawals);

        const pendings = transactions.filter(transaction => transaction.status === "pending")
        const successfuls = transactions.filter(transaction => transaction.status === "success")




        res.render('adminDashboard', { users, deposits, withdrawals, investments, earnings, pendings })
    }

}


module.exports = new AdminController
