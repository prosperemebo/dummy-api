"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterObj = (obj, ...allowedFields) => {
    const filteredObject = {};
    Object.keys(obj).forEach((key) => {
        if (allowedFields.includes(key)) {
            filteredObject[key] = obj[key];
        }
    });
    return filteredObject;
};
exports.default = filterObj;
