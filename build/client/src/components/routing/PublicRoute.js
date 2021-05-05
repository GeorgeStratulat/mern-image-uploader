"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../actions");
var axios_1 = __importDefault(require("axios"));
var store_1 = require("../../store");
var PublicRoute = /** @class */ (function (_super) {
    __extends(PublicRoute, _super);
    function PublicRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PublicRoute.prototype.componentDidUpdate = function () {
        var _this = this;
        // Log user out if session expires
        if (this.props.isAuthenticated) {
            axios_1.default.get(store_1.axiosURL + "/api/auth/isloggedin").then(function (res) {
                if (res.data === false) {
                    _this.props.sessionExpired();
                }
                else {
                    return;
                }
            });
        }
    };
    PublicRoute.prototype.render = function () {
        return this.props.isAuthenticated ? (react_1.default.createElement(react_router_dom_1.Redirect, { to: "/dashboard" })) : (react_1.default.createElement(react_router_dom_1.Route, __assign({}, this.props)));
    };
    return PublicRoute;
}(react_1.Component));
var mapDispatchToProps = function (dispatch) { return ({
    sessionExpired: function () { return dispatch({ type: actions_1.ActionTypes.logoutUser }); },
}); };
exports.default = react_redux_1.connect(null, mapDispatchToProps)(PublicRoute);
