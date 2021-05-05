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
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const appError_1 = require("../utils/appError");
const Users_1 = require("../models/Users");
function requireAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.session && req.session.loggedIn && req.session.userId) {
            // need to select password changed at otherwise method changedPasswordAfter wont see it
            const user = yield Users_1.Users.findById(req.session.userId).select("+passwordChangedAt");
            // This to logout / destroy session of any users logged in when password was changed
            // If user is deactivated auth is invalid
            if (!user || (user && user.changedPasswordAfter(req.session.date))) {
                req.session.destroy((err) => {
                    if (err)
                        return next(err);
                    res.clearCookie("sid");
                });
            }
            else
                return next();
        }
        return next(new appError_1.AppError("You are not logged in! Please log in to gain access.", 403));
    });
}
exports.requireAuth = requireAuth;
