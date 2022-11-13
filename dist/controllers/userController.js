"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const handlerFactory_1 = require("./handlerFactory");
exports.getAllUsers = (0, handlerFactory_1.getAll)(User_1.default);
exports.getUser = (0, handlerFactory_1.getOne)(User_1.default);
exports.createUser = (0, handlerFactory_1.createOne)(User_1.default);
exports.updateUser = (0, handlerFactory_1.updateOne)(User_1.default);
exports.deleteUser = (0, handlerFactory_1.deleteOne)(User_1.default);
