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
exports.privRoutesArr = exports.pubRoutesArr = void 0;
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const axios_1 = __importDefault(require("axios"));
const actions_1 = require("../../actions");
const PrivateRoute_1 = __importDefault(require("./PrivateRoute"));
const Home_1 = __importDefault(require("../pages/Home"));
const Login_1 = __importDefault(require("../auth/Login"));
const Dashboard_1 = __importDefault(require("../pages/Dashboard"));
const Register_1 = __importDefault(require("../auth/Register"));
const PublicRoute_1 = __importDefault(require("./PublicRoute"));
const store_1 = require("../../store");
exports.pubRoutesArr = [
    { name: "Home", path: "/", component: Home_1.default, nav: true },
    { name: "Login", path: "/login", component: Login_1.default, nav: true },
    { name: "Register", path: "/register", component: Register_1.default, nav: true },
];
exports.privRoutesArr = [
    { name: "Dashboard", path: "/dashboard", component: Dashboard_1.default, nav: true },
];
class Routes extends react_1.Component {
    componentDidMount() {
        axios_1.default.get(`${store_1.axiosURL}/api/auth/isloggedin`)
            .then((res) => {
            if (!res.data) {
                this.props.sessionExpired();
            }
            else if (res.data) {
                this.props.persistUser(res.data);
            }
        })
            .catch((err) => {
            console.error(err);
            this.props.sessionExpired();
        });
    }
    render() {
        return (react_1.default.createElement(react_router_dom_1.Switch, null,
            exports.pubRoutesArr.map((route) => (react_1.default.createElement(PublicRoute_1.default, { key: route.name, isAuthenticated: this.props.auth.isAuthenticated, exact: true, path: route.path, component: route.component }))),
            exports.privRoutesArr.map((route) => (react_1.default.createElement(PrivateRoute_1.default, { key: route.name, isAuthenticated: this.props.auth.isAuthenticated, exact: true, path: route.path, component: route.component })))));
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts,
});
const mapDispatchToProps = (dispatch) => ({
    sessionExpired: () => dispatch({ type: actions_1.ActionTypes.logoutUser }),
    persistUser: (user) => {
        return dispatch({ type: actions_1.ActionTypes.persistUser, payload: user });
    },
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Routes);
