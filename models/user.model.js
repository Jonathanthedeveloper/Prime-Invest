const {Schema, model} = require('mongoose');

const userSchema = new Schema ({
    userId: {
        type: Number,
        trim: true,
        unique: true,
        required: true
    },
    fullName : {
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
});

const User = model('User', userSchema);
module.exports = User;