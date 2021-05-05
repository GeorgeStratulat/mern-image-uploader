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
const axios_1 = __importDefault(require("axios"));
const react_bootstrap_1 = require("react-bootstrap");
const actions_1 = require("../../actions");
const Spinner_1 = __importDefault(require("../utils/Spinner/Spinner"));
const store_1 = require("../../store");
class Dashboard extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            selectedImage: null,
            visible: false,
            modalImage: "",
            loading: false,
        };
        this.openModal = (src) => {
            this.setState({ modalImage: src, visible: true });
        };
        this.hideModal = () => {
            this.setState({ visible: false });
        };
        this.imageSelectHandler = (e) => {
            this.imageUploadHandler(e.target.files[0], e.target.files[0].name);
        };
        this.imageUploadHandler = (image, imageName) => {
            const fd = new FormData();
            fd.append("image", image, imageName);
            axios_1.default
                .post(`${store_1.axiosURL}/images/add`, fd, {
                onUploadProgress: () => {
                    this.setState({ loading: true });
                },
            })
                .then((res) => {
                this.props.persistUser(res.data);
                this.setState({ loading: false });
            });
        };
    }
    render() {
        const { currentUser } = this.props.auth;
        const { visible, modalImage, loading } = this.state;
        return (react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("h4", { className: "form-label" }, "Default file input example"),
            react_1.default.createElement("input", { type: "file", className: "form-control", id: "customFile", onChange: this.imageSelectHandler }),
            loading && react_1.default.createElement(Spinner_1.default, null),
            react_1.default.createElement("div", { className: "card" },
                react_1.default.createElement("div", { className: "card-body" }, currentUser &&
                    currentUser.images &&
                    currentUser.images.length > 0 &&
                    currentUser.images.map((item, index) => (react_1.default.createElement("img", { className: "img-thumbnail", src: item, key: index, alt: "icon", onClick: () => {
                            this.openModal(item);
                        } }))))),
            react_1.default.createElement(react_bootstrap_1.Modal, { size: "xl", show: visible, onHide: this.hideModal },
                react_1.default.createElement(react_bootstrap_1.Modal.Body, null,
                    react_1.default.createElement("img", { alt: "alt", className: "modal-image", src: modalImage })))));
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    users: state.users,
    alerts: state.alerts,
});
const mapDispatchToProps = (dispatch) => ({
    persistUser: (user) => {
        return dispatch({ type: actions_1.ActionTypes.persistUser, payload: user });
    },
});
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(Dashboard);
