"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.isOperational = true; // To identify operational errors from programming errors, Only operational errors are handled by this class
        this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
