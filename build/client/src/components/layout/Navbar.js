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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../actions");
var Routes_1 = require("../routing/Routes");
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.render = function () {
        var publicRoute = Routes_1.pubRoutesArr.filter(function (route) { return route.nav !== false; });
        var privateRoute = Routes_1.privRoutesArr.filter(function (route) { return route.nav !== false; });
        var isAuthenticated = this.props.auth.isAuthenticated;
        return (react_1.default.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            react_1.default.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#navbarNavDropdown", "aria-controls": "navbarNavDropdown", "aria-expanded": "false", "aria-label": "Toggle navigation" },
                react_1.default.createElement("span", { className: "navbar-toggler-icon" })),
            react_1.default.createElement("div", { className: "collapse navbar-collapse", id: "navbarNavDropdown" },
                react_1.default.createElement("ul", { className: "navbar-nav" },
                    !isAuthenticated
                        ? publicRoute.map(function (route) { return (react_1.default.createElement("li", { className: "nav-item", key: route.name },
                            react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: route.path }, route.name))); })
                        : privateRoute.map(function (route) { return (react_1.default.createElement("li", { key: route.name },
                            react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: route.path }, route.name))); }),
                    isAuthenticated && (react_1.default.createElement("li", { className: "nav-item" },
                        react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/login", onClick: this.props.getLogout }, "Logout")))))));
    };
    return Navbar;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts,
}); };
exports.default = react_redux_1.connect(mapStateToProps, { getLogout: actions_1.getLogout })(Navbar);
