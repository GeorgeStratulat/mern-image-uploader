"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAlert = exports.setAlert = exports.AlertType = void 0;
var types_1 = require("./types");
var AlertType;
(function (AlertType) {
    AlertType["success"] = "success";
    AlertType["error"] = "error";
    AlertType["info"] = "info";
    AlertType["warning"] = "warning";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
var setAlert = function (msg, alertType) { return function (dispatch) {
    dispatch({
        type: types_1.ActionTypes.alert,
        payload: { msg: msg, alertType: alertType }
    });
}; };
exports.setAlert = setAlert;
var resetAlert = function () { return function (dispatch) {
    dispatch({
        type: types_1.ActionTypes.resetAlert
    });
}; };
exports.resetAlert = resetAlert;
