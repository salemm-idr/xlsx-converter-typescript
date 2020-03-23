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
var SheetSchema = new mongoose_1.Schema({
    item: mongoose_1.Schema.Types.Mixed
}, { strict: false });
//* Export the model and return your IUser interface
exports.default = mongoose_1.default.model("Sheet", SheetSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1NoZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE2RDtBQUk3RCxJQUFNLFdBQVcsR0FBVSxJQUFJLGlCQUFNLENBQUM7SUFDdEMsSUFBSSxFQUFDLGlCQUFNLENBQUMsS0FBSyxDQUFDLEtBQUs7Q0FDdEIsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsQ0FBQyxDQUFBO0FBQ2pCLG9EQUFvRDtBQUNwRCxrQkFBZSxrQkFBUSxDQUFDLEtBQUssQ0FBUyxPQUFPLEVBQUMsV0FBVyxDQUFDLENBQUEifQ==