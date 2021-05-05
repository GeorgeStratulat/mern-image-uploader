"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const enums_1 = require("./enums");
// middlewares are requesthandlers
function use(...middlewares) {
    return function (target, key, desc) {
        Reflect.defineMetadata(enums_1.MetadataKeys.Middleware, middlewares, target, key);
    };
}
exports.use = use;
