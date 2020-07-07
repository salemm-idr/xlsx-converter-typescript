"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var SingleSheetSchema = new mongoose_1.Schema({
    item: mongoose_1.Schema.Types.Mixed
});
exports.default = mongoose_1.default.model("SingleSchema", SingleSheetSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2luZ2xlU2hlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1NpbmdsZVNoZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUEyRDtBQU0zRCxJQUFNLGlCQUFpQixHQUFHLElBQUksaUJBQU0sQ0FBQztJQUNuQyxJQUFJLEVBQUMsaUJBQU0sQ0FBQyxLQUFLLENBQUMsS0FBSztDQUN4QixDQUFDLENBQUM7QUFFSCxrQkFBZSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyJ9