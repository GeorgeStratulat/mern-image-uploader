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
exports.imagesController = void 0;
const express_1 = require("express");
const appError_1 = require("./../utils/appError");
const Users_1 = require("../models/Users");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname.replace(/\s+/g, ""));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter,
});
exports.imagesController = express_1.Router();
exports.imagesController.post("/add", upload.single("image"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session) {
        console.log(req.session.user._id);
        const user = yield Users_1.Users.findByIdAndUpdate(req.session.user._id, {
            $push: {
                images: "http://" + req.headers.host + "/" + req.file.path,
            },
        }, { new: true, upsert: true });
        console.log("user", user);
        if (req.session) {
            req.session.loggedIn = true;
            req.session.user = user;
            req.session.date = Date.now();
        }
        res.status(200).json(user);
    }
    else {
        return next(new appError_1.AppError("No session token found", 402));
    }
}));
