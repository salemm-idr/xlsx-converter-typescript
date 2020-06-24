"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var converter_route_1 = require("./converter.route");
//*Global route handling
var Api = /** @class */ (function () {
    function Api() {
    }
    Api.initialize = function (app) {
        app.use("/api/convert", new converter_route_1.ConverterRoutes().routes);
    };
    return Api;
}());
exports.default = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvdXRlcy9BcGkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSxxREFBb0Q7QUFFcEQsd0JBQXdCO0FBQ3hCO0lBQUE7SUFJQSxDQUFDO0lBSGUsY0FBVSxHQUF4QixVQUF5QixHQUF3QjtRQUMvQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLGlDQUFlLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0gsVUFBQztBQUFELENBQUMsQUFKRCxJQUlDIn0=