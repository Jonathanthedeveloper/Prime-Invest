const AdminService = require('../services/admin.service');
const userService = require('../services/user.service');
const depositService = require('../services/deposit.service');
const transactionService = require('../services/transaction.service')



class AdminController {

    async renderAdminDashboard(req, res) {
        // fetching user data
        const transactions = await transactionService.findAll({});

        console.log(transactions);


        res.render('adminDashboard', { transactions })
    }

}


module.exports = new AdminController
