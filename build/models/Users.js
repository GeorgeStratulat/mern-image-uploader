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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// import generator from 'generator'
// use save to run validators again because find and update wont
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "User must have an email"],
        unique: true,
        lowercase: true,
        validator: [validator_1.default.isEmail, "Must be a valid email address"]
    },
    password: {
        type: String,
        select: false,
        minlength: 6,
        required: [true, "User must have a password"]
        // default: generator.generate({
        // 	length: 6,
        // 	numbers: true
        // })
    },
    images: {
        type: [String],
        required: false
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    lastEdited: Date,
    passwordChangedAt: {
        type: Date,
        select: false
    },
    passwordResetToken: String,
    passwordResetExpires: Date
});
// Middleware
userSchema.pre(/^find/, function (next) {
    // 'this' points to the current query before executing the event /^find/
    if (this instanceof mongoose_1.default.Query)
        this.find({ active: { $ne: false } }).select("-__v");
    next();
});
// update changedPasswordAt when resetting password
// Skips if password is NOT modified or NEW.
userSchema.pre("save", function (next) {
    if (!this.isModified("password") || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000; // subtracting 1 second takes into account delay in saving into database so that its before the token is generated
    next();
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Only run this function if password was actually modified
        // Changing password or password creation eg. new password
        if (!this.isModified("password"))
            return next();
        const saltRounds = 12;
        if (this.password)
            this.password = yield bcryptjs_1.default.hash(this.password, saltRounds);
        next();
    });
});
userSchema.methods.checkPassword = function (password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, hashedPassword);
    });
};
// For changing password -- to keep track of
userSchema.methods.changedPasswordAfter = function (timestamp) {
    if (this.passwordChangedAt) {
        //getTime() is a Date function
        //Assuming timestamp is given in seconds
        // const changedTimeStamp = (this.passwordChangedAt as Date).getTime() / 1000; // for jwt timestamp
        return this.passwordChangedAt > timestamp;
    }
    return false;
};
userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto_1.default.randomBytes(32).toString("hex");
    // crypto module that doesn't require much processor
    // Only use bcrypt for passwords
    this.passwordResetToken = crypto_1.default
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    return resetToken; // returns unhashed token
};
exports.Users = mongoose_1.default.model("Users", userSchema);
