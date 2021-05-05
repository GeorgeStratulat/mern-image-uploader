"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const appError_1 = require("./appError");
// MonogoDB and mongoose use export Error types as Classes
// Invalid ids
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`; //Invalid _id : wwwwwwww
    return new appError_1.AppError(message, 400);
};
// Duplicate fields
const handleDuplicateFieldsDB = (err) => {
    // regular expressions is always between two slashes '/'
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/); //reg expression between quotation marks
    const message = `Duplicate field value: ${
    //value returns an array
    value[0]}. Please use another value!`;
    return new appError_1.AppError(message, 400);
};
// Validation DB errors
const handleValidationErrorDB = (err) => {
    // Object.values converts object property values into an array with the object as argument
    // err.errors return an object of errors with properties where theres validation errors
    const errors = Object.values(err.errors)
        .map((el) => el.message)
        .join(". ");
    console.log(errors);
    // Join array into a single string
    const message = `Invalid input data. ${errors}`;
    return new appError_1.AppError(message, 400);
};
// JWT errors
const handleJWTError = (err) => {
    return new appError_1.AppError("Invalid token. Please log in again!", 401);
};
// Custom type guards
function isIAppError(err) {
    return "isOperational" in err; // isOperational errors
}
function isCastError(err) {
    return err.name === "CastError"; // defined by type
}
function isValidationError(err) {
    return err.name === "ValidationError"; // defined by type
}
function isDuplicateError(err) {
    return err.code === 11000; // code for DuplicateFields
}
function isJSONError(err) {
    return err.name === "JsonWebTokenError";
}
const sendErrorProd = (err, res) => {
    // Operational, trusted error: send message to client
    // Production mode: Only send meaningful,concise and easy to understand errors
    if (isIAppError(err)) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
        // Programming or other unknown errors
    }
    else {
        // 1) Log error
        console.error("ERROR", err);
        // 2) Send generic message
        res.status(500).json({
            status: "error",
            message: "Something went very wrong",
        });
    }
};
const sendErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack, // stack trace
    });
};
// Error handler passed from controllers
const globalErrorHandler = (err, req, res, next) => {
    // Define additional error properties
    // Union types doesn't let redefining of parameters (err)
    let newError = Object.assign({}, err);
    if (process.env.NODE_ENV === "development") {
        // destructuring doesnt work with error
        if (isIAppError(err)) {
            sendErrorDev(err, res);
        }
        else {
            newError = Object.assign(Object.assign({}, newError), { status: "error", statusCode: 500 });
            sendErrorDev(newError, res);
        }
    }
    else if (process.env.NODE_ENV === "production") {
        // Cast Error
        if (isCastError(newError))
            newError = handleCastErrorDB(newError);
        //  Mongo Duplicate Error
        else if (isDuplicateError(newError)) {
            newError = handleDuplicateFieldsDB(newError);
        }
        // Validation Error from mongoose
        else if (isValidationError(newError))
            newError = handleValidationErrorDB(newError);
        // JWT Error
        else if (isJSONError(newError))
            newError = handleJWTError(newError);
        //
        else {
            //  destructuring doesnt work with error as some properties can not be destructured
            // Other errors that wasn't handled but passed as appError
            sendErrorProd(err, res);
            return next();
        }
        // Send newError to client
        sendErrorProd(newError, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
