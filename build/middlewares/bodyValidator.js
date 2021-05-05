"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
const appError_1 = require("./../utils/appError");
// BodyValidator middleware
function bodyValidator(...keys) {
    return function (req, res, next) {
        if (!req.body) {
            next(new appError_1.AppError("Invalid Request", 422));
        }
        for (let key of keys) {
            if (!req.body[key]) {
                return next(new appError_1.AppError(`Missing ${key}!`, 422));
            }
        }
        next();
    };
}
exports.bodyValidator = bodyValidator;
