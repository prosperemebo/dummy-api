"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../abstracts/enums");
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        this.status = `${statusCode}`.startsWith('4')
            ? enums_1.ResponseStatus.fail
            : enums_1.ResponseStatus.error;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AppError;
