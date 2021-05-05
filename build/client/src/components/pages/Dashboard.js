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
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var axios_1 = __importDefault(require("axios"));
var react_bootstrap_1 = require("react-bootstrap");
var actions_1 = require("../../actions");
var Spinner_1 = __importDefault(require("../utils/Spinner/Spinner"));
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            selectedImage: null,
            visible: false,
            modalImage: "",
            loading: false,
        };
        _this.openModal = function (src) {
            _this.setState({ modalImage: src, visible: true });
        };
        _this.hideModal = function () {
            _this.setState({ visible: false });
        };
        _this.imageSelectHandler = function (e) {
            _this.imageUploadHandler(e.target.files[0], e.target.files[0].name);
        };
        _this.imageUploadHandler = function (image, imageName) {
            var fd = new FormData();
            fd.append("image", image, imageName);
            axios_1.default
                .post("/images/add", fd, {
                onUploadProgress: function () {
                    _this.setState({ loading: true });
                },
            })
                .then(function (res) {
                _this.props.persistUser(res.data);
                _this.setState({ loading: false });
            });
        };
        return _this;
    }
    Dashboard.prototype.render = function () {
        var _this = this;
        var currentUser = this.props.auth.currentUser;
        var _a = this.state, visible = _a.visible, modalImage = _a.modalImage, loading = _a.loading;
        return (react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("h4", { className: "form-label" }, "Default file input example"),
            react_1.default.createElement("input", { type: "file", className: "form-control", id: "customFile", onChange: this.imageSelectHandler }),
            loading && react_1.default.createElement(Spinner_1.default, null),
            react_1.default.createElement("div", { className: "card" },
                react_1.default.createElement("div", { className: "card-body" }, currentUser &&
                    currentUser.images &&
                    currentUser.images.length > 0 &&
                    currentUser.images.map(function (item, index) { return (react_1.default.createElement("img", { className: "img-thumbnail", src: item, key: index, alt: "icon", onClick: function () {
                            _this.openModal(item);
                        } })); }))),
            react_1.default.createElement(react_bootstrap_1.Modal, { size: "xl", show: visible, onHide: this.hideModal },
                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                    react_1.default.createElement("img", { alt: "alt", className: "modal-image", src: modalImage })))));
    };
    return Dashboard;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    persistUser: function (user) {
        return dispatch({ type: actions_1.ActionTypes.persistUser, payload: user });
    },
}); };
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Dashboard);
