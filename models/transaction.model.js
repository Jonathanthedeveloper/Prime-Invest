const { Schema, model } = require('mongoose');

const accountSchema = new Schema({

})


const transactionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        enum: ['withdrawal', 'deposit', 'investment', 'earning'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    plan: {
        type: String
    },
    medium: {
        type: String
    },
    status: {
        type: String,
        enum: ["pending", "successful", "failed"],
        default: "pending"
    },
    expiresAt: {
        type: Date,
    }

}, { timestamps: true });



const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;