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
exports.getAll = exports.getOne = exports.createOne = exports.updateOne = exports.deleteOne = void 0;
const enums_1 = require("../abstracts/enums");
const apiFeatures_1 = __importDefault(require("../utils/apiFeatures"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const deleteOne = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Model.findByIdAndDelete(req.params.id);
    if (!doc) {
        return next(new appError_1.default(`No document found with ID of '${req.params.id}' on ${Model.modelName}.`, 404));
    }
    const response = {
        status: enums_1.ResponseStatus.success,
        data: null,
    };
    return res.status(204).json(response);
}));
exports.deleteOne = deleteOne;
const updateOne = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!doc) {
        return next(new appError_1.default(`No document found with ID of '${req.params.id}' on ${Model.modelName}`, 404));
    }
    const response = {
        status: enums_1.ResponseStatus.success,
        data: {
            data: doc,
        },
    };
    return res.status(201).json(response);
}));
exports.updateOne = updateOne;
const createOne = (Model) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield Model.create(req.body);
    const response = {
        status: enums_1.ResponseStatus.success,
        data: {
            data: doc,
        },
    };
    return res.status(201).json(response);
}));
exports.createOne = createOne;
const getOne = (Model, ...populateOpt) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let query = Model.findById(req.params.id);
    if (populateOpt) {
        populateOpt.forEach((opt) => {
            query = query.populate(opt);
        });
    }
    const doc = yield query;
    if (!doc) {
        return next(new appError_1.default(`No document found with ID of '${req.params.id}' on ${Model.modelName}.`, 404));
    }
    const response = {
        status: enums_1.ResponseStatus.success,
        data: {
            data: doc,
        },
    };
    return res.status(200).json(response);
}));
exports.getOne = getOne;
const getAll = (Model, ...populateOpt) => (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const features = new apiFeatures_1.default(Model.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    if (populateOpt) {
        populateOpt.forEach((opt) => {
            features.query.populate(opt);
        });
    }
    const doc = yield features.query;
    const response = {
        status: enums_1.ResponseStatus.success,
        results: doc.length,
        data: {
            data: doc,
        },
    };
    return res.status(200).json(response);
}));
exports.getAll = getAll;
