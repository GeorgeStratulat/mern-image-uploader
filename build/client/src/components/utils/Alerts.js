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
const react_status_alert_1 = __importStar(require("react-status-alert"));
require("react-status-alert/dist/status-alert.css");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const actions_1 = require("../../actions");
class Alerts extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            alertIds: [],
            location: this.props.location
        };
    }
    componentDidUpdate(prevProps) {
        // Remove alert everytime route changes
        if (this.props.location !== prevProps.location) {
            for (const id of this.state.alertIds)
                react_status_alert_1.StatusAlertService.removeAlert(id);
        }
        // Add new alert whenever alert is added to the store's state
        if (this.props.alerts !== prevProps.alerts) {
            const currentIds = this.state.alertIds;
            this.props.alerts.forEach(alert => {
                let alertId = "";
                const { msg, alertType } = alert;
                // Add custom options such as background color for each alert type
                alertId = react_status_alert_1.StatusAlertService.showAlert(msg, alertType);
                this.setState({ alertIds: [...currentIds, alertId] });
            });
        }
    }
    render() {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement(react_status_alert_1.default, null)));
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts
});
exports.default = react_redux_1.connect(mapStateToProps, {
    setAlert: actions_1.setAlert,
    resetAlert: actions_1.resetAlert
})(react_router_dom_1.withRouter(Alerts));
