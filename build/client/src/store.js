"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosURL = void 0;
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var reducers_1 = require("./reducers");
// thunk allows async dispatch
var middleware = [redux_thunk_1.default];
var composeEnhancers = redux_devtools_extension_1.composeWithDevTools({ trace: true }); //allows tracing
var store = redux_1.createStore(reducers_1.reducers, composeEnhancers(redux_1.applyMiddleware.apply(void 0, middleware)));
exports.axiosURL = "";
exports.default = store;
// REDUX
// 1) Set up store store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)))
// 2) Add provider and parameter store inside it, inside app.js
// 3) create rootReducer that uses combineReducer
// 4) Create reducer with initial state, action ---- action takes in a type and pay load /// Add switch case statement for each cases that return a payload from actions
// 5) To make sure strings are immutable, store types into a variable in a file under the folder actions/types
// 6) Create action with argument of dispatch and using thunk, add arguments to be used in the payload.
// 7) Go to component that will use the action and add connect()(Component). --- it takes in connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?)
// 8) Add proptypes of Component and inside, the actions you imported: 'pt/f/r' and then use actions passing in the arguments required.
// 9) Create a component for the action by adding connect with mapStateToProps, creating the function that passes a state --- this is done through connect and root reducer.
// 10) Now have access to the state and can include conditionals of what to display/input based on state.
// 11) Add component and it should work
