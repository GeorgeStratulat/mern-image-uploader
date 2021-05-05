"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../actions");
const axios_1 = __importDefault(require("axios"));
const store_1 = require("../../store");
class PublicRoute extends react_1.Component {
    componentDidUpdate() {
        // Log user out if session expires
        if (this.props.isAuthenticated) {
            axios_1.default.get(`${store_1.axiosURL}/api/auth/isloggedin`).then((res) => {
                if (res.data === false) {
                    this.props.sessionExpired();
                }
                else {
                    return;
                }
            });
        }
    }
    render() {
        return this.props.isAuthenticated ? (react_1.default.createElement(react_router_dom_1.Redirect, { to: "/dashboard" })) : (react_1.default.createElement(react_router_dom_1.Route, Object.assign({}, this.props)));
    }
}
const mapDispatchToProps = (dispatch) => ({
    sessionExpired: () => dispatch({ type: actions_1.ActionTypes.logoutUser }),
});
exports.default = react_redux_1.connect(null, mapDispatchToProps)(PublicRoute);
