const {Schema, model} = require('mongoose');
const {generateUserId} = require('../utils');

const userSchema = new Schema ({
    userId: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    name : {
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
    }
}, {timestamps: true});

const User = model('User', userSchema);
module.exports = User;