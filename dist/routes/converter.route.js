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
        //*manage routes on basic root /api/convert/'names'
        /**
         * *you can list all your routes here and manage with controllers
         */
        get: function () {
            var controller = this.fileConverter;
            router.post("/xfile", controller.convert);
            return router; //*must return the same router
        },
        enumerable: true,
        configurable: true
    });
    return ConverterRoutes;
}());
exports.ConverterRoutes = ConverterRoutes;
