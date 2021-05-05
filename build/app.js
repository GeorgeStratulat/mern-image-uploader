"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var morgan_1 = __importDefault(require("morgan"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var hpp_1 = __importDefault(require("hpp"));
var express_session_1 = __importDefault(require("express-session"));
var appError_1 = require("./utils/appError");
var globalErrorHandler_1 = require("./utils/globalErrorHandler");
var controllers_1 = require("./controllers");
var imagesController_1 = require("./controllers/imagesController");
exports.app = express_1.default();
//////////////////////// Global Middlewares//////////////////////////
// Add htp headers that secure the server
exports.app.use(helmet_1.default());
// Development logging
if (process.env.NODE_ENV === "development") {
    exports.app.use(morgan_1.default("dev"));
}
if (process.env.NODE_ENV === "production") {
    exports.app.use(express_1.default.static("client/build"));
}
// Converts incoming json data to js object ---- Body parser that reads data from body into req.body
exports.app.use(express_1.default.json({ limit: "10kb" })); // package will parse 10kb into meaningful data
if (process.env.SESSION_SECRET) {
    exports.app.use(express_session_1.default({
        secret: process.env.SESSION_SECRET,
        name: "sid",
        resave: false,
        saveUninitialized: false,
        cookie: {
            // maxAge: 36000, // remove if we want it as a session
            sameSite: true,
            secure: process.env.NODE_ENV === "production" ? true : false,
        },
    }));
}
else {
    exports.app.use(function (req, res, next) {
        next(new appError_1.AppError("missing session secret", 500));
    });
}
// Data sanitization against NoSQL query injection
//Look at the req and filter out all '$' and '.' that sends queries to db illegaly
exports.app.use(express_mongo_sanitize_1.default());
// Prevent parameter pollution
// prevents adding duplicated parameters in query
// The whitelist works for both req.query and req.body.
exports.app.use(hpp_1.default({
    whitelist: [], // add http parameters used
}));
// Route Handlers
exports.app.use("/api", controllers_1.authRoute, controllers_1.userRoute);
exports.app.use("/images", imagesController_1.imagesController);
exports.app.use("/uploads", express_1.default.static("uploads"));
exports.app.use(globalErrorHandler_1.globalErrorHandler);