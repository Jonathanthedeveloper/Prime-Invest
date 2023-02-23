const { Schema, model } = require('mongoose');
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
    
}, {timestamps: true})


const transactionSchema = new Schema({
    deposits: {
        type: [depositSchema]
    },
    withdrawals: {
        type: [withdrawalSchema]
    },
    earnings: {
        type: [earningSchema]
    },
    investments: {
        type: [investmentSchema]
    }
})

const walletSchema = new Schema({
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

const bankSchema = new Schema({
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

const accountSchema = new Schema({
    bitcoinAddress: {
        type: String,
        trim: true,
        default: ""
    },
    bank: bankSchema
});



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
    secret: secretSchema,
    account: accountSchema

}, { timestamps: true });



const Secret = model('Secret', secretSchema);
const Bank = model('Bank', bankSchema);
const Account = model('Account', accountSchema);
const User = model('User', userSchema);
module.exports = User;

