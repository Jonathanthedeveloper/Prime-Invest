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

const bankSchema = new Schema({
    bankName: {
        type: String,
        trim: true,
        default: ""
    },
    bankAddress : {
        type: String,
        trim: true,
        default: ""
    },
    accountNumber : {
        type: String,
        trim: true,
        default: ""
    },
    accountName: {
        type: String,
        trim: true,
        default: ""
    },
    sortCode :{
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

const User = model('User', userSchema);
module.exports = User;

