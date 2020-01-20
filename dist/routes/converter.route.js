"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Converter_1 = require("../controller/Converter");
var express_1 = require("express");
var router = express_1.Router();
var ConverterRoutes = /** @class */ (function () {
    function ConverterRoutes() {
        this.fileConverter = new Converter_1.Converter();
    }
    Object.defineProperty(ConverterRoutes.prototype, "routes", {
        get: function () {
            var controller = this.fileConverter;
            router.post("/xfile", controller.convert);
            return router;
        },
        enumerable: true,
        configurable: true
    });
    return ConverterRoutes;
}());
exports.default = ConverterRoutes;
