"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CatchAsync = (fn) => (req, res, next) => fn(req, res, next).catch((err) => next(err));
exports.default = CatchAsync;
