const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema({
    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a to account"],
        index: true,
    },
    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "Transaction must be associated with a to account"],
        index: true,
    },
    status:{
        type: String,
        enum:{
            values: ["PENDING", "COMPLETED", "FAILED"],
            message: "Status can be either PENDING, COMPLETE, or FAILED or REVERSED",
        },
        default: "PENDING",
    },
    amount:{
        type: String,
        required: [true, "Amount is required for creating a transaction"],
        min: [0, "Transaction amount cannot be negative"],
    },
    idempotencyKey:{
        type: String,
        required: [true, "Idempotency Key is required for creating a trasaction"],
        index: true, 
        unique: true,
    },
}, {
    timestamps: true,
});


const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;