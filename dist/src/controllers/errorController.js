"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../abstracts/enums");
const appError_1 = __importDefault(require("../utils/appError"));
const handleCasttErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new appError_1.default(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
    const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value of ${value}. Please use another value!'`;
    return new appError_1.default(message, 400);
};
const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid inut data. ${errors.join('. ')}`;
    return new appError_1.default(message, 404);
};
const handleBodyParsingError = (err) => {
    const message = `Invalid input data; ${err.message}.`;
    return new appError_1.default(message, 400);
};
const handleJWTError = () => new appError_1.default('Invalid token, please log in again!', 401);
const handleJWTExpiredError = () => new appError_1.default('Your token has expired, please log in again!', 401);
const sendErrorDev = (err, res) => {
    const response = {
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    };
    res.status(err.statusCode).json(response);
};
const sendErrorProd = (err, res) => {
    if (err.isOperational) {
        const response = {
            status: err.status,
            message: err.message,
        };
        res.status(err.statusCode).json(response);
    }
    else {
        console.error('ERROR 💥', err);
        const response = {
            status: enums_1.ResponseStatus.error,
            message: 'Something went wrong!',
        };
        res.status(500).json(response);
    }
};
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || enums_1.ResponseStatus.error;
    if (process.env.NODE_ENV === enums_1.NODE_ENV.development) {
        sendErrorDev(err, res);
    }
    else {
        let error = Object.assign({}, err);
        Object.assign(error, { message: err.message, stack: err.stack });
        if (err.name === 'CastError')
            error = handleCasttErrorDB(err);
        if (err.code === 11000)
            error = handleDuplicateFieldsDB(err);
        if (err.name === 'ValidationError')
            error = handleValidationErrorDB(err);
        if (err.type === 'entity.parse.failed')
            error = handleBodyParsingError(err);
        if (err.name === 'JsonWebTokenError')
            error = handleJWTError();
        if (err.name === 'TokenExpiredError')
            error = handleJWTExpiredError();
        sendErrorProd(error, res);
    }
};
exports.default = globalErrorHandler;
