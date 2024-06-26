const AdminService = require("../services/admin.service");
const userService = require("../services/user.service");
const depositService = require("../services/deposit.service");
const transactionService = require("../services/transaction.service");
const { User } = require("../models/user.model");
const { referralEarningPercent } = require("../config");
const Email = require("../utils/mail.util");
const CronJob = require("cron").CronJob;
const payInvestors = require("../utils/payInvestors");

class AdminController {
  constructor() {
    const job = new CronJob(
      "0 0 * * *",
      async function () {
        await payInvestors();
      },
      null,
      true,
      "America/Los_Angeles"
    );
  }

  async renderAdminDashboard(req, res) {
    // fetching user data
    const transactions = await transactionService.findAll({});
    const users = await userService.findAll({});

    const deposits = transactions.filter((transaction) => {
      return (
        transaction.type === "deposit" && transaction.status === "successful"
      );
    });
    const withdrawals = transactions.filter(
      (transaction) =>
        transaction.type === "withdrawal" && transaction.status === "successful"
    );
    const investments = transactions.filter(
      (transaction) =>
        transaction.type === "investment" && transaction.status === "successful"
    );
    const earnings = transactions.filter(
      (transaction) =>
        transaction.type === "earning" && transaction.status === "successful"
    );

    const pendings = transactions.filter(
      (transaction) => transaction.status === "pending"
    );
    const successfuls = transactions.filter(
      (transaction) => transaction.status === "successful"
    );

    res.render("adminDashboard", {
      users,
      deposits,
      withdrawals,
      investments,
      earnings,
      pendings,
      transactions,
    });
  }

  async renderAdminDeposit(req, res) {
    const transactions = await transactionService.findAll({});
    const deposits = transactions.filter((transaction) => {
      return transaction.type === "deposit";
    });

    deposits.sort((a, b) => b.createdAt - a.createdAt);

    res.render("adminDeposit", { deposits });
  }

  async renderAdminWithdrawal(req, res) {
    const transactions = await transactionService.findAll({});
    const withdrawals = transactions.filter((transaction) => {
      return transaction.type === "withdrawal";
    });

    withdrawals.sort((a, b) => b.createdAt - a.createdAt);
    res.render("adminWithdraw", { withdrawals });
  }

  async handleApproval(req, res) {
    const { id, approve } = req.body;
    const status = approve === "confirm" ? "successful" : "failed";
    const transaction = await transactionService.update(
      { _id: id },
      { status }
    );

    if (transaction.type === "deposit") {
      if (transaction.user.referredBy) {
        const referralEarnings = {
          from: transaction.user._id,
          user: transaction.user.referredBy,
          type: "referral earnings",
          status: "successful",
          amount: referralEarningPercent * transaction.amount,
        };

        const refEarnings = await transactionService.create(referralEarnings);
        await User.findByIdAndUpdate(transaction.user.referredBy, {
          $push: { earnings: refEarnings._id },
        });
      }
      new Email(transaction.user, ".", transaction.amount).sendDeposit();
      res.redirect("/user/admin/deposit");
    } else if (transaction.type === "withdrawal") {
      new Email(transaction.user, ".", transaction.amount).sendWithdrawal();
      res.redirect("/user/admin/withdraw");
    }
  }

  async renderReferrals(req, res) {
    const users = await User.find({}).populate("referredBy");

    const referredUsers = users.filter((user) => user.referredBy);

    // res.send(referredUsers)

    res.render("adminRefer", { referredUsers });
  }

  async renderAdminUsers(req, res) {
    const users = await User.find({}).populate("referredBy");

    res.render("adminUser", { users });
  }

  async renderAdminUsersProfile(req, res) {
    const user = await userService.findOne({ _id: req.params.user });
    res.render("adminPersonalProfile", { user });
  }

  async handlePayouts(req, res) {
    // transactionService.updateMany({}, updateData)
    // res.send("success")
  }
  async handleBonus(req, res) {
    try {
      const user = await userService.findOne({ email: req.body.email });
      if (!user) {
        req.flash("status", "fail");
        res.redirect("/user/admin/bonus");
        return;
      }

      const transactionData = {
        user: user._id,
        type: req.body.action,
        amount: req.body.amount,
        status: "successful",
      };

      const transaction = await transactionService.create(transactionData);

      if (transaction.type === "bonus") {
        user.earnings.push(transaction._id);
      } else if (transaction.type === "deposit") {
        user.deposits.push(transaction._id);
        new Email(user, "", req.body.amount).sendDeposit();
      }

      await user.save();

      req.flash("status", "success");
      res.redirect("/user/admin/bonus");
    } catch (error) {
      req.flash("status", "fail");
      res.redirect("/user/admin/bonus");
    }
  }
}

module.exports = new AdminController();
