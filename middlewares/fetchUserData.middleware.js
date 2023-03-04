
const userService = require("../services/user.service")

const fetchUserData = async (req, res, next) => {
    const user = req.user

    if (!user) {
        req.flash('alert', JSON.stringify({ "message": "Something Went Very wrong please login again", "status": "error" }));
        res.redirect('/user/login');
        return;
    }

    // console.log(user);


    const userInformation = await userService.findOne({ _id: user._id });

    if (!userInformation) {
        req.flash('alert', JSON.stringify({ "message": "Something Went Very wrong please login again", "status": "error" }));
        res.redirect('/user/login');
        return;
    }

    // const withdrawals = userInformation.withdrawals.filter(withdrawal => withdrawal.status === 'successful')
    // const deposits = userInformation.deposits.filter(deposit => deposit.status === 'successful')
    // const investments = userInformation.investments.filter(investment => investment.status === 'successful')
    // const earnings = userInformation.earnings.filter(earning => earning.status === 'successful')

    // const balance = deposits.reduce((total, deposit) => total + deposit.amount, 0) - withdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0) - investments.reduce((total, investment) => total + investment.amount, 0) + earnings.reduce((total, earning) => total + earning.amount, 0)

    console.log(balance)

    req.user = userInformation
    next()
}


module.exports = fetchUserData