"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAlert = exports.setAlert = exports.AlertType = void 0;
const types_1 = require("./types");
var AlertType;
(function (AlertType) {
    AlertType["success"] = "success";
    AlertType["error"] = "error";
    AlertType["info"] = "info";
    AlertType["warning"] = "warning";
})(AlertType = exports.AlertType || (exports.AlertType = {}));
const setAlert = (msg, alertType) => (dispatch) => {
    dispatch({
        type: types_1.ActionTypes.alert,
        payload: { msg, alertType }
    });
};
exports.setAlert = setAlert;
const resetAlert = () => (dispatch) => {
    dispatch({
        type: types_1.ActionTypes.resetAlert
    });
};
exports.resetAlert = resetAlert;
