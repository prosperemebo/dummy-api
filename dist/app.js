"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const helmet_1 = __importDefault(require("helmet"));
const errorController_1 = __importDefault(require("./controllers/errorController"));
const insuranceRoutes_1 = require("./routes/insuranceRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const appError_1 = __importDefault(require("./utils/appError"));
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(morgan('dev'));
const limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests, please try again in an hour!',
});
app.use('/api', limiter);
app.use(express_1.default.json({ limit: '10kb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10kb' }));
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
    whitelist: ['price', 'ratingsQuantity', 'ratingsQuantity'],
}));
app.use((req, res, next) => {
    Object.assign(req, { requestTime: new Date().toISOString() });
    next();
});
app.use('/api/v1/users', userRoutes_1.userRouter);
app.use('/api/v1/insurance', insuranceRoutes_1.insuranceRouter);
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find '${req.originalUrl}':${req.method} on this server!`, 404));
});
app.use(errorController_1.default);
exports.default = app;
