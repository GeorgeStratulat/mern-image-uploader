"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_1 = require("react-router");
const axios_1 = __importDefault(require("axios"));
const react_redux_1 = require("react-redux");
const actions_1 = require("../../actions");
const store_1 = require("../../store");
class PrivateRoute extends react_router_1.Route {
    componentDidMount() {
        // Log user out if session expires
        if (this.props.isAuthenticated) {
            axios_1.default.get(`${store_1.axiosURL}/api/auth/isloggedin`)
                .then((res) => {
                if (!res.data) {
                    this.props.sessionExpired();
                }
                else {
                    return;
                }
            })
                .catch((err) => {
                console.error(err);
                this.props.sessionExpired();
            });
        }
    }
    componentDidUpdate() {
        // Log user out if session expires
        if (this.props.isAuthenticated) {
            axios_1.default.get(`${store_1.axiosURL}/api/auth/isloggedin`)
                .then((res) => {
                if (res.data === false) {
                    this.props.sessionExpired();
                }
                else {
                    return;
                }
            })
                .catch((err) => {
                console.error(err);
                this.props.sessionExpired();
            });
        }
    }
    render() {
        return !this.props.isAuthenticated ? (react_1.default.createElement(react_router_1.Redirect, { to: "/login" })) : (react_1.default.createElement(react_router_1.Route, Object.assign({}, this.props)));
    }
}
const mapDispatchToProps = (dispatch) => ({
    sessionExpired: () => dispatch({ type: actions_1.ActionTypes.logoutUser }),
});
exports.default = react_redux_1.connect(null, mapDispatchToProps)(PrivateRoute);
