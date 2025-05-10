"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.status || 500} - ${err.message}`);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.expose ? err.message : 'Something went wrong. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => {
    next((0, http_errors_1.default)(404, `Not Found - ${req.originalUrl}`));
};
exports.notFoundHandler = notFoundHandler;
exports.default = exports.errorHandler;
