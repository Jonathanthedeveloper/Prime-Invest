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
        enum: ['withdrawal', 'deposit', 'investment', 'interest'],
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
    }

}, { timestamps: true });

transactionSchema.post('update', function (transaction, next) {
    console.log(transaction._id)
    next()
})

const Transaction = model('Transaction', transactionSchema);

module.exports = Transaction;