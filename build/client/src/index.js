"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
require("bootstrap/dist/css/bootstrap.css");
require("bootstrap/js/src/collapse.js");
var App_1 = __importDefault(require("./App"));
var store_1 = __importDefault(require("./store"));
react_dom_1.default.render(react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
    react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
        react_1.default.createElement(App_1.default, null))), document.getElementById("root"));
