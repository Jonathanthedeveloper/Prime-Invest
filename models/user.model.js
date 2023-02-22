const { Schema, model } = require('mongoose');
const { generateUserId } = require('../utils');



const secretSchema = new Schema({
    question: {
        type: String,
    },
    answer: {
        type: String,
        trim: true
    }
});

const bankSchema = new Schema({
    bankName: {
        type: String,
        trim: true,
    },
    bankAddress : {
        type: String,
        trim: true,
    },
    accountNumber : {
        type: String,
        trim: true,
    },
    accountName: {
        type: String,
        trim: true,
    },
    sortCode :{
        type: String,
        trim: true
    }

})

const accountSchema = new Schema({
    bitcoinAddress: {
        type: String,
        trim: true
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

