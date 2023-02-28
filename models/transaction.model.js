const { Schema, model } = require('mongoose');

const accountSchema = new Schema({

})


const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ['withdrawal', 'deposit', 'investment', 'interest'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending"
    }

}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;