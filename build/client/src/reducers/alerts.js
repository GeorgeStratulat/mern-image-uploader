"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alertReducer = void 0;
const actions_1 = require("../actions");
const initialState = [];
const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions_1.ActionTypes.alert:
            return [...state, action.payload];
        case actions_1.ActionTypes.resetAlert:
            return initialState;
        default:
            return state;
    }
};
exports.alertReducer = alertReducer;
