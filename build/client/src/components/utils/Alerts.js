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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_status_alert_1 = __importStar(require("react-status-alert"));
require("react-status-alert/dist/status-alert.css");
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var actions_1 = require("../../actions");
var Alerts = /** @class */ (function (_super) {
    __extends(Alerts, _super);
    function Alerts() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            alertIds: [],
            location: _this.props.location
        };
        return _this;
    }
    Alerts.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        // Remove alert everytime route changes
        if (this.props.location !== prevProps.location) {
            for (var _i = 0, _a = this.state.alertIds; _i < _a.length; _i++) {
                var id = _a[_i];
                react_status_alert_1.StatusAlertService.removeAlert(id);
            }
        }
        // Add new alert whenever alert is added to the store's state
        if (this.props.alerts !== prevProps.alerts) {
            var currentIds_1 = this.state.alertIds;
            this.props.alerts.forEach(function (alert) {
                var alertId = "";
                var msg = alert.msg, alertType = alert.alertType;
                // Add custom options such as background color for each alert type
                alertId = react_status_alert_1.StatusAlertService.showAlert(msg, alertType);
                _this.setState({ alertIds: __spreadArray(__spreadArray([], currentIds_1), [alertId]) });
            });
        }
    };
    Alerts.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_status_alert_1.default, null)));
    };
    return Alerts;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts
}); };
exports.default = react_redux_1.connect(mapStateToProps, {
    setAlert: actions_1.setAlert,
    resetAlert: actions_1.resetAlert
})(react_router_dom_1.withRouter(Alerts));
