"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
require("reflect-metadata");
function catchAsync(target, key, desc) {
    const method = target[key];
    desc.value = (req, res, next) => {
        /// an event listener
        // Same as as try/catch block but only catches error and errors are automatically send through next
        method(req, res, next).catch(next); // goes towards global error handler ..........err => next(err)
    };
}
exports.catchAsync = catchAsync;
