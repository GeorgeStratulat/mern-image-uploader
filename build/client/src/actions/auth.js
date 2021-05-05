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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.getLogout = exports.postLogin = exports.persistUser = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const alerts_1 = require("./alerts");
const store_1 = require("../store");
const persistUser = (user) => catchAsync_1.default((dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("persistUser from actions", user);
    dispatch({
        type: types_1.ActionTypes.persistUser,
        payload: user,
    });
    dispatch(alerts_1.setAlert(`${user.email} successfully logged in`, alerts_1.AlertType.success));
}));
exports.persistUser = persistUser;
const postLogin = (email, password) => catchAsync_1.default((dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("logging in with ", email);
    const res = yield axios_1.default.post(`${store_1.axiosURL}/api/auth/login`, {
        email,
        password,
    });
    console.log("login response", res);
    dispatch({
        type: types_1.ActionTypes.loginUser,
        payload: res.data,
    });
    dispatch(alerts_1.setAlert(`${res.data.email} successfully logged in`, alerts_1.AlertType.success));
}));
exports.postLogin = postLogin;
const getLogout = () => catchAsync_1.default((dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    yield axios_1.default.get(`${store_1.axiosURL}/api/auth/logout`);
    dispatch({ type: types_1.ActionTypes.logoutUser });
}));
exports.getLogout = getLogout;
const registerUser = (form) => catchAsync_1.default((dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios_1.default.post(`${store_1.axiosURL}/api/users/register`, form);
    dispatch({
        type: types_1.ActionTypes.registerUser,
        payload: res.data,
    });
    dispatch(alerts_1.setAlert(`Welcome! You have been successfully registered!`, alerts_1.AlertType.success));
}));
exports.registerUser = registerUser;
