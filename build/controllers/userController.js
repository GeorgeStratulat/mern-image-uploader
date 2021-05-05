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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const appError_1 = require("./../utils/appError");
const express_1 = require("express");
const decorators_1 = require("../decorators");
const Users_1 = require("../models/Users");
const bodyValidator_1 = require("../middlewares/bodyValidator");
const queryHandling_1 = require("./../utils/queryHandling");
const requireAuth_1 = require("../middlewares/requireAuth");
const checkBody_1 = require("../utils/checkBody");
exports.userRoute = express_1.Router();
// commented out password in user model
let UserController = class UserController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const newUser = yield Users_1.Users.create({
                email,
                password,
            });
            // remove password from json output;
            newUser.password = undefined;
            // need to send an email with default password of user
            // password must only be seen by the user and not the admin that registered user
            res.status(201).json(newUser);
        });
    }
    getAllUsers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //add queryHandling
            const query = Users_1.Users.find();
            const features = new queryHandling_1.QueryHandling(query, req.query).sort().filter();
            const users = yield features.query;
            res.status(200).json(users);
        });
    }
    updateMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // Update user document
            //   Since body is of any type, checkBody ignore other object keys not specified
            const filterBody = checkBody_1.checkBody(req.body, ["email", "photo"], next);
            if (req.session) {
                const user = yield Users_1.Users.findByIdAndUpdate(req.session.userId, filterBody, {
                    new: true,
                    runValidators: true,
                });
                res.status(200).json(user);
            }
            else {
                return next(new appError_1.AppError("No session token found", 402));
            }
        });
    }
    addImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req);
        });
    }
    deleteMe(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session) {
                const user = yield Users_1.Users.findByIdAndUpdate(req.session.userId, {
                    active: false,
                });
                return res.status(204).json(user);
            }
            next(new appError_1.AppError("User not logged in", 403));
        });
    }
};
__decorate([
    decorators_1.post("/register"),
    decorators_1.use(bodyValidator_1.bodyValidator("email", "password", "confirmPassword")),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUser", null);
__decorate([
    decorators_1.get("/"),
    decorators_1.use(requireAuth_1.requireAuth),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    decorators_1.patch("/updateMe"),
    decorators_1.use(requireAuth_1.requireAuth),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateMe", null);
__decorate([
    decorators_1.post("/addImage")
    // @use(requireAuth)
    ,
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addImage", null);
__decorate([
    decorators_1.del("/deleteme"),
    decorators_1.use(requireAuth_1.requireAuth),
    decorators_1.catchAsync,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteMe", null);
UserController = __decorate([
    decorators_1.controller("/users", exports.userRoute)
], UserController);
