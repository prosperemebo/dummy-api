"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInsurance = exports.updateInsurance = exports.createInsurance = exports.getInsurancePolicy = exports.getInsurance = exports.getAllInsurance = void 0;
const enums_1 = require("../abstracts/enums");
const Insurance_1 = __importDefault(require("../models/Insurance"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const handlerFactory_1 = require("./handlerFactory");
exports.getAllInsurance = (0, handlerFactory_1.getAll)(Insurance_1.default);
exports.getInsurance = (0, handlerFactory_1.getOne)(Insurance_1.default);
exports.getInsurancePolicy = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = Insurance_1.default.findOne({ policyNumber: req.params.id });
    const doc = yield query;
    if (!doc) {
        return next(new appError_1.default(`No document found with ID of '${req.params.id}' on ${Insurance_1.default.modelName}.`, 404));
    }
    const response = {
        status: enums_1.ResponseStatus.success,
        data: {
            data: doc,
        },
    };
    return res.status(200).json(response);
}));
exports.createInsurance = (0, handlerFactory_1.createOne)(Insurance_1.default);
exports.updateInsurance = (0, handlerFactory_1.updateOne)(Insurance_1.default);
exports.deleteInsurance = (0, handlerFactory_1.deleteOne)(Insurance_1.default);
