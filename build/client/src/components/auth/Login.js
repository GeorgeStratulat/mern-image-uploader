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
var react_redux_1 = require("react-redux");
var actions_1 = require("../../actions");
var Spinner_1 = __importDefault(require("../utils/Spinner/Spinner"));
var react_router_dom_1 = require("react-router-dom");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            email: "",
            password: "",
            loading: false,
            pathname: _this.props.history.location.pathname,
        };
        _this.handleChange = function (e) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[e.target.name] = e.target.value, _a)));
        };
        _this.handleSubmit = function (e) {
            e.preventDefault();
            var _a = _this.state, email = _a.email, password = _a.password;
            // Set loading to true which adds spinner
            _this.setState({ loading: true });
            // Login user
            _this.props.postLogin(email, password).then(function (res) {
                // Refresh form if authentication fails
                // isAuthenticated is only updated after updating the store's state
                // This callback is called straight after the action which is before the latter
                if (_this.props.history.location.pathname === _this.state.pathname) {
                    _this.setState({ email: "", password: "", loading: false });
                }
            });
        };
        return _this;
    }
    Login.prototype.render = function () {
        var _a = this.state, email = _a.email, password = _a.password;
        return (react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-lg-10 col-xl-9 mx-auto" },
                    react_1.default.createElement("div", { className: "card card-signin flex-row my-5" },
                        react_1.default.createElement("div", { className: "card-img-left d-none d-md-flex" }),
                        this.state.loading ? (react_1.default.createElement(Spinner_1.default, null)) : (react_1.default.createElement("div", { className: "card-body" },
                            react_1.default.createElement("h5", { className: "card-title text-center" }, "Login"),
                            react_1.default.createElement("form", { className: "form-signin", onSubmit: this.handleSubmit },
                                react_1.default.createElement("input", { type: "email", className: "form-control", name: "email", value: email, onChange: this.handleChange, placeholder: "Email", required: true }),
                                react_1.default.createElement("input", { type: "password", pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}", title: "Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters", className: "form-control", name: "password", value: password, onChange: this.handleChange, placeholder: "Password", required: true }),
                                react_1.default.createElement("input", { type: "submit", className: "btn btn-primary full-width", value: "Login" })),
                            react_1.default.createElement("p", { className: "centered-p" },
                                "Don't have an account? ",
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/register" }, "Sign up")))))))));
    };
    return Login;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    auth: state.auth,
}); };
exports.default = react_redux_1.connect(mapStateToProps, { postLogin: actions_1.postLogin })(Login);
