"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.ResponseStatus = exports.NODE_ENV = void 0;
var NODE_ENV;
(function (NODE_ENV) {
    NODE_ENV["development"] = "development";
    NODE_ENV["production"] = "production";
})(NODE_ENV = exports.NODE_ENV || (exports.NODE_ENV = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["success"] = "success";
    ResponseStatus["fail"] = "fail";
    ResponseStatus["error"] = "error";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
var UserRoles;
(function (UserRoles) {
    UserRoles["user"] = "user";
    UserRoles["manager"] = "manager";
    UserRoles["admin"] = "admin";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
