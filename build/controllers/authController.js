"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
const crypto_1 = __importDefault(require("crypto"));
const decorators_1 = require("../decorators");
const Users_1 = require("../models/Users");
const appError_1 = require("./../utils/appError");
const bodyValidator_1 = require("../middlewares/bodyValidator");
const requireAuth_1 = require("../middlewares/requireAuth");
const Email_1 = require("../utils/Email");
exports.authRoute = express_1.Router();
// commented out password in user model
let UserController = class UserController {
    isLoggedIn(req, res) {
        if ((req.session && !req.session.loggedIn) || !req.session) {
            res.status(200).json(false);
        }
        else {
            res.status(200).json(req.session.user);
        }
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            // Password by default is not selected
            let user = yield Users_1.Users.findOne({ email }).select("+password");
            // If user's account has been deactivated by user, reactivate it.
            if (!user) {
                const activateUser = yield Users_1.Users.updateOne({ email }, { active: true });
                // Only search user if user exist
                if (activateUser.n)
                    user = yield Users_1.Users.findOne({
                        email,
                    }).select("+password");
            }
            // Verify user exist and password is correct
            if (!user ||
                (user.password && !(yield user.checkPassword(password, user.password))))
                return next(new appError_1.AppError("Invalid email or password. Please try again.", 401));
            // remove users password from response
            user.password = undefined;
            // Add to session
            // any type need to fix
            if (req.session) {
                req.session.loggedIn = true;
                req.session.user = user;
                req.session.date = Date.now();
            }
            res.status(200).json(user);
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session)
                req.session.destroy((err) => {
                    if (err)
                        return next(err);
                    res.clearCookie("sid");
                    res.status(200).send("User logged out");
                });
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, url } = req.body;
            //  Get user based on POSTed email from user input
            const user = yield Users_1.Users.findOne({
                email,
            });
            if (!user) {
                return next(new appError_1.AppError("There is no user with this email address", 404));
            }
            // Generate the random reset token
            const resetToken = user.createPasswordResetToken();
            //   Password reset token added to user document and should be saved
            yield user.save({
                validateBeforeSave: false,
            }); // modified the user document ... disabled validators before save
            // Not enough to catch error in global error handling and use catchAsync
            // Need to also delete/undefined the reset password token and expiration
            try {
                const resetURL = url + "/reset/" + resetToken;
                yield new Email_1.Email(user).sendPasswordReset(resetToken, resetURL);
                res.status(200).json({
                    status: "success",
                    message: "Token sent to email!",
                });
            }
            catch (error) {
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                yield user.save({
                    validateBeforeSave: false,
                }); // dont need to revalidate
                console.error(error);
                return next(new appError_1.AppError("There was an error sending the email. Try again later", 500));
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword, confirmPassword } = req.body;
            // Check if newPassword is same as confirmPassword
            if (newPassword != confirmPassword)
                return next(new appError_1.AppError("Please confirm password correctly.", 400));
            // 1) Get user based on the token
            // sha256 is the name of the algorithm
            // Hash the token from email
            const hashedToken = crypto_1.default
                .createHash("sha256")
                .update(req.params.token)
                .digest("hex");
            //// If expiry is greater than now(or undefined), then its not expired
            // Finds user
            const user = yield Users_1.Users.findOne({
                passwordResetToken: hashedToken,
                passwordResetExpires: {
                    $gt: Date.now(),
                }, // mongoDB can convert different format into the same to compare eg. miliseconds
            });
            // 2) If token has not expired, and there is user, set the new password
            // Check if user is found
            if (!user) {
                return next(new appError_1.AppError("Token is invalid or has expired", 400));
            }
            // modify data
            user.password = newPassword;
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            yield user.save(); // use save to run validators again because find and update wont
            // 3) Update changePasswordAt property of the user
            // DONE in pre middleware of User schema
            // 4) Log the user in using session
            if (req.session) {
                req.session.loggedIn = true;
                req.session.userId = user.id;
            }
            res.status(200).json(user);
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, newPassword, confirmPassword } = req.body;
            // Check if newPassword is same as confirmPassword
            if (newPassword != confirmPassword)
                return next(new appError_1.AppError("Please confirm password correctly.", 400));
            // 1) Get user from collection
            // forces select to be true and find if user exist
            // req.user was from requireAuth middleware session to make sure user is logged in
            if (req.session) {
                const user = yield Users_1.Users.findById(req.session.userId).select("+password");
                // 2) Check if POSTed current password is correct
                if (user &&
                    user.password &&
                    !(yield user.checkPassword(currentPassword, user.password))) {
                    return next(new appError_1.AppError("Please enter the correct current password.", 401));
                }
                else if (user) {
                    // 3) If so, update password
                    user.password = newPassword;
                    // validators in Schema happen after saving into Document
                    // User.findByIdAndUpdate will not work as intended!
                    yield user.save();
                    user.password = undefined;
                    // 4) Password changed at and password needs to be modified
                    //   Added middlewares that updates passwordChanged and password
                    //   requireAuth  takes into account changedPasswordAfter ( changed password while logged in)
                    // Set new date for the user changing the password to be still logged in but windows will be logged out
                    req.session.date = Date.now();
                    res.status(200).json(user);
                }
            }
            else
                next(new appError_1.AppError(" No session found. User may not be logged in!", 403));
        });
    }
};
__decorate([
    decorators_1.get("/isloggedin"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "isLoggedIn", null);
__decorate([
    decorators_1.post("/login"),
    decorators_1.use(bodyValidator_1.bodyValidator("email", "password")),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    decorators_1.get("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
__decorate([
    decorators_1.post("/forgotpassword"),
    decorators_1.use(bodyValidator_1.bodyValidator("email", "url")),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "forgotPassword", null);
__decorate([
    decorators_1.patch("/resetpassword/:token"),
    decorators_1.use(bodyValidator_1.bodyValidator("newPassword", "confirmPassword")),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    decorators_1.post("/changepassword"),
    decorators_1.use(requireAuth_1.requireAuth, bodyValidator_1.bodyValidator("currentPassword", "newPassword", "confirmPassword")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
UserController = __decorate([
    decorators_1.controller("/auth", exports.authRoute)
], UserController);
