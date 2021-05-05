"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../actions/types");
const actions_1 = require("../actions");
// Normal Dispatch Action from redux require returning an action and not function
// It requires a type property which is not needed with Thunk
const catchAsync = (fn) => {
    return (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        yield fn(dispatch).catch((err) => {
            console.error(err);
            if (err.response) {
                // Log user out if deactivated --- 401 Unauthorized
                // Log out user if no session exist --- 403  Forbidden
                if (err.response.status === 401 || err.response.status === 403)
                    dispatch({ type: types_1.ActionTypes.logoutUser });
                // If server down
                if (err.response.status === 500) {
                    return dispatch(actions_1.setAlert("Unfortunately there's a problem in our end...", actions_1.AlertType.error));
                }
                const errors = err.response.data;
                dispatch(actions_1.setAlert(errors.message, actions_1.AlertType.error));
            }
        });
    });
};
exports.default = catchAsync;
