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
const react_redux_1 = require("react-redux");
const actions_1 = require("../../actions");
const Spinner_1 = __importDefault(require("../utils/Spinner/Spinner"));
const react_router_dom_1 = require("react-router-dom");
class Login extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            email: "",
            password: "",
            loading: false,
            pathname: this.props.history.location.pathname,
        };
        this.handleChange = (e) => {
            this.setState(Object.assign(Object.assign({}, this.state), { [e.target.name]: e.target.value }));
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            const { email, password } = this.state;
            // Set loading to true which adds spinner
            this.setState({ loading: true });
            // Login user
            this.props.postLogin(email, password).then((res) => {
                // Refresh form if authentication fails
                // isAuthenticated is only updated after updating the store's state
                // This callback is called straight after the action which is before the latter
                if (this.props.history.location.pathname === this.state.pathname) {
                    this.setState({ email: "", password: "", loading: false });
                }
            });
        };
    }
    render() {
        const { email, password } = this.state;
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
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
});
exports.default = react_redux_1.connect(mapStateToProps, { postLogin: actions_1.postLogin })(Login);
