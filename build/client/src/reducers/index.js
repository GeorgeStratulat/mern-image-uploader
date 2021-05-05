"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducers = void 0;
const redux_1 = require("redux");
const auth_1 = require("./auth");
const alerts_1 = require("./alerts");
const users_1 = require("./users");
exports.reducers = redux_1.combineReducers({
    auth: auth_1.authReducer,
    users: users_1.userReducer,
    alerts: alerts_1.alertReducer
});
