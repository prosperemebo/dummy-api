"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    initial: { type: String, required: true },
    name: { type: String, required: true },
    policyNumber: { type: Number },
    status: { type: Boolean, required: true },
    price: { type: Number, required: true },
    fullname: String,
});
schema.pre('save', function () {
    this.fullname = `${this.initial} ${this.name}`;
    this.policyNumber = Math.floor(Math.random() * 50000);
});
const Insurance = (0, mongoose_1.model)('Insurance', schema);
exports.default = Insurance;
