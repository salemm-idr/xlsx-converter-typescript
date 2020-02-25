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
            //! habialita una nueva ruta router.get("/getjson", controller.getJson);
            return router; //*must return the same router
        },
        enumerable: true,
        configurable: true
    });
    return ConverterRoutes;
}());
exports.ConverterRoutes = ConverterRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLnJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9jb252ZXJ0ZXIucm91dGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBb0Q7QUFDcEQsbUNBQWlDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLGdCQUFNLEVBQUUsQ0FBQztBQUV4QjtJQUVFO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLHFCQUFTLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBS0Qsc0JBQUksbUNBQU07UUFKVixtREFBbUQ7UUFDbkQ7O1dBRUc7YUFDSDtZQUNFLElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLHdFQUF3RTtZQUN4RSxPQUFPLE1BQU0sQ0FBQyxDQUFDLDhCQUE4QjtRQUMvQyxDQUFDOzs7T0FBQTtJQUNILHNCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSwwQ0FBZSJ9