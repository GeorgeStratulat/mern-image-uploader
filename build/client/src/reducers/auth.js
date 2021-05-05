"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReducer = void 0;
var actions_1 = require("../actions");
var initialState = {
    currentUser: null,
    isAuthenticated: false,
};
var authReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.ActionTypes.loginUser:
        case actions_1.ActionTypes.persistUser:
        case actions_1.ActionTypes.registerUser:
            return {
                currentUser: action.payload,
                isAuthenticated: true,
            };
        case actions_1.ActionTypes.logoutUser:
            return {
                currentUser: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};
exports.authReducer = authReducer;
