"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: String,
    email: String,
    loan_type: String,
    salary: Number,
    have_existing_loan: Boolean,
    monthly_repay: Number,
    has_bought_over: Boolean,
    loan_provider_choice: String,
    mobile_number: String,
    bvn: String,
    business_location: String,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
const User = (0, mongoose_1.model)('User', schema);
exports.default = User;
