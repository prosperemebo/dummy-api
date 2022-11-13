"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
process.on('uncaughtException', ({ name, message, stack }) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log('ERROR', { name, message, stack });
    process.exit(1);
});
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './config.env' });
const app_1 = __importDefault(require("./app"));
const port = 3000 || process.env.PORT;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseURI = (_a = process.env.DATABASE) === null || _a === void 0 ? void 0 : _a.replace('<PASSWORD>', databasePassword !== null && databasePassword !== void 0 ? databasePassword : '');
mongoose_1.default
    .connect(databaseURI !== null && databaseURI !== void 0 ? databaseURI : '')
    .then(() => console.log('DB connection Successful!'));
const server = app_1.default.listen(port, () => console.log(`App running on port ${port}`));
process.on('unhandledRejection', ({ name, message, stack }) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log('ERROR', { name, message, stack });
    server.close(() => process.exit(1));
});
