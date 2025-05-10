"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const notFound = (req, res, next) => {
    const error = (0, http_errors_1.default)(404, `Not Found - ${req.originalUrl}`);
    next(error);
};
exports.default = notFound;
