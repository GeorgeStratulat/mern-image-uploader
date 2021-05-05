"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userReducer = void 0;
var initialState = [];
var userReducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    // Switch statements acts as type guard which determines unique action union
    // action usually cannot be destructured due to type unions
    switch (action.type) {
        default:
            return state;
    }
};
exports.userReducer = userReducer;
