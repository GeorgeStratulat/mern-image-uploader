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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
class Home extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    render() {
        return (react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" },
                react_1.default.createElement("div", { className: "col-lg-10 col-xl-9 mx-auto" },
                    react_1.default.createElement("div", { className: "card card-signin flex-row my-5" },
                        react_1.default.createElement("div", { className: "card-img-left d-none d-md-flex" }),
                        react_1.default.createElement("div", { className: "card-body" },
                            react_1.default.createElement("h5", { className: "card-title text-center" }, "Home"),
                            react_1.default.createElement("p", { className: "centered-p" },
                                "Don't have an account? ",
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/register" }, "Sign up")),
                            react_1.default.createElement("p", { className: "centered-p" },
                                "Already have an account? ",
                                react_1.default.createElement(react_router_dom_1.Link, { to: "/login" }, "Sign in"))))))));
    }
}
exports.default = Home;
