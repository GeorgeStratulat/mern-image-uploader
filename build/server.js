"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Must be your own private process variables
dotenv_1.default.config({ path: "./config.env" });
const app_1 = require("./app");
const mongoose_1 = __importDefault(require("mongoose"));
// SYNC Unhandled rejections
// listening to event uncaughtException
process.on("uncaughtException", (err) => {
    console.log("UNCAUGHT Exception! Shutting down...");
    console.log(err.name, err.message);
    process.exit(1); // 0 success , 1 for unhandled rejection
});
// Connecting to mongoDB using mongoose
const mongoConnection = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose_1.default
    .connect(mongoConnection, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connection is successful!"));
// Development / Production mode
console.log(`Server running on: ${process.env.NODE_ENV} mode`);
const port = process.env.PORT || 8081;
const server = app_1.app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
// ASYNC Promises
// process object will emmit unhandled rejection
// promise rejection to have last safety nets
process.on("unhandledRejection", (reason, promise) => {
    console.log("UNHANDLED REJECTION! Shutting down...");
    if (reason instanceof Error)
        console.log(`AT ${promise}`, reason.name, reason.message);
    server.close(() => {
        //  BY having server.close finishes all request that is being handled then closes the app
        process.exit(1); // 0 success , 1 for unhandled rejection
    });
});
// Need a tool that restarts application
