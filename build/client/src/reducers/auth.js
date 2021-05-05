"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authReducer = void 0;
const actions_1 = require("../actions");
const initialState = {
    currentUser: null,
    isAuthenticated: false,
};
const authReducer = (state = initialState, action) => {
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
