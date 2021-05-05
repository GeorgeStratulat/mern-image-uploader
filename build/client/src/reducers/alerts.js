"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertReducer = void 0;
var actions_1 = require("../actions");
var initialState = [];
var alertReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case actions_1.ActionTypes.alert:
            return __spreadArray(__spreadArray([], state), [action.payload]);
        case actions_1.ActionTypes.resetAlert:
            return initialState;
        default:
            return state;
    }
};
exports.alertReducer = alertReducer;
