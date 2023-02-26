const { Schema, model, default: mongoose } = require('mongoose');
const { generateUserId } = require('../utils');



const secretSchema = new Schema({
    question: {
        type: String,
        default: ""
    },
    answer: {
        type: String,
        trim: true,
        default: ""
    }
});


const depositSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },

}, { timestamps: true })


const withdrawalSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true })


const earningSchema = new Schema({
    amount: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const investmentSchema = new Schema({
    amount: {
        type: Number,
        rquired: true
    }
}, { timestamps: true })


const transactionSchema = new Schema({
    deposits: {
        type: [depositSchema],
        required: true,
        default: []
    },
    withdrawals: {
        type: [withdrawalSchema],
        required: true,
        default: []
    },
    earnings: {
        type: [earningSchema],
        required: true,
        default: []
    },
    investments: {
        type: [investmentSchema],
        required: true,
        default: []
    },
    history: {
        type: [],
        required: true,
        default: true
    }
})

const walletSchema = new Schema({ //done
    balance: {
        type: Number,
        required: true,
        default: 0.00
    },
    transactions: {
        type: transactionSchema,
        required: true
    }
})



const bankSchema = new Schema({ // done
    bankName: {
        type: String,
        trim: true,
        default: ""
    },
    bankAddress: {
        type: String,
        trim: true,
        default: ""
    },
    accountNumber: {
        type: String,
        trim: true,
        default: ""
    },
    accountName: {
        type: String,
        trim: true,
        default: ""
    },
    sortCode: {
        type: String,
        trim: true,
        default: ""
    }

})

const accountSchema = new Schema({ //done
    bitcoinAddress: {
        type: String,
        trim: true,
        default: ""
    },
    bank: bankSchema
});


referralSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
})



const userSchema = new Schema({
    userId: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    secret: {
        type: secretSchema,
        required: true,
    },
    account: {
        type: accountSchema,
        required: true
    },
    wallet: {
        type: walletSchema,
        required: true
    },
    referrals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    referredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });


const Withdrawal = model("Withdrawal", withdrawalSchema)
const Deposit = model("Deposit", depositSchema)
const Earning = model("Earning", earningSchema)
const Investment = model("Investment", investmentSchema)
const Wallet = model("Wallet", walletSchema)
const Transaction = model("Transaction", transactionSchema)
const Secret = model('Secret', secretSchema);
const Bank = model('Bank', bankSchema);
const Account = model('Account', accountSchema);
const User = model('User', userSchema);
module.exports = User;

