"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converter_route_1 = require("./converter.route");
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.initialize = function (app) {
        app.use("api/convert", new converter_route_1.ConverterRoutes().routes);
    };
    return Api;
}());
exports.default = Api;
