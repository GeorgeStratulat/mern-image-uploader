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
exports.privRoutesArr = exports.pubRoutesArr = void 0;
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var axios_1 = __importDefault(require("axios"));
var actions_1 = require("../../actions");
var PrivateRoute_1 = __importDefault(require("./PrivateRoute"));
var Home_1 = __importDefault(require("../pages/Home"));
var Login_1 = __importDefault(require("../auth/Login"));
var Dashboard_1 = __importDefault(require("../pages/Dashboard"));
var Register_1 = __importDefault(require("../auth/Register"));
var PublicRoute_1 = __importDefault(require("./PublicRoute"));
exports.pubRoutesArr = [
    { name: "Home", path: "/", component: Home_1.default, nav: true },
    { name: "Login", path: "/login", component: Login_1.default, nav: true },
    { name: "Register", path: "/register", component: Register_1.default, nav: true },
];
exports.privRoutesArr = [
    { name: "Dashboard", path: "/dashboard", component: Dashboard_1.default, nav: true },
];
var Routes = /** @class */ (function (_super) {
    __extends(Routes, _super);
    function Routes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Routes.prototype.componentDidMount = function () {
        var _this = this;
        axios_1.default.get("/api/auth/isloggedin")
            .then(function (res) {
            if (!res.data) {
                _this.props.sessionExpired();
            }
            else if (res.data) {
                _this.props.persistUser(res.data);
            }
        })
            .catch(function (err) {
            console.error(err);
            _this.props.sessionExpired();
        });
    };
    Routes.prototype.render = function () {
        var _this = this;
        return (react_1.default.createElement(react_router_dom_1.Switch, null,
            exports.pubRoutesArr.map(function (route) { return (react_1.default.createElement(PublicRoute_1.default, { key: route.name, isAuthenticated: _this.props.auth.isAuthenticated, exact: true, path: route.path, component: route.component })); }),
            exports.privRoutesArr.map(function (route) { return (react_1.default.createElement(PrivateRoute_1.default, { key: route.name, isAuthenticated: _this.props.auth.isAuthenticated, exact: true, path: route.path, component: route.component })); })));
    };
    return Routes;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    sessionExpired: function () { return dispatch({ type: actions_1.ActionTypes.logoutUser }); },
    persistUser: function (user) {
        return dispatch({ type: actions_1.ActionTypes.persistUser, payload: user });
    },
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Routes);
