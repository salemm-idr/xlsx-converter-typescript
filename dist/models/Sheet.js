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
var LOCATION = {
    lat: { type: String, },
    lng: { type: String }
};
var SheetSchema = new mongoose_1.Schema({
    msisdn: { type: Number },
    type: { type: String },
    sideA: { type: Number },
    sideB: { type: String },
    startDate: { type: Date },
    startHour: { type: Date },
    duration: { type: Number },
    location: { type: LOCATION },
    createdAt: { type: Date }
}, { strict: false });
//* Export the model and return your IUser interface
exports.default = mongoose_1.default.model("Sheet", SheetSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hlZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1NoZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1EQUE2RDtBQUU3RCxJQUFNLFFBQVEsR0FBRTtJQUNkLEdBQUcsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEdBQUU7SUFDbEIsR0FBRyxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztDQUNsQixDQUFBO0FBZUQsSUFBTSxXQUFXLEdBQVUsSUFBSSxpQkFBTSxDQUFDO0lBQ3RDLE1BQU0sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDcEIsSUFBSSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQztJQUNsQixLQUFLLEVBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDO0lBQ25CLEtBQUssRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDbkIsU0FBUyxFQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQztJQUNyQixTQUFTLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDO0lBQ3JCLFFBQVEsRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUM7SUFDdEIsUUFBUSxFQUFDLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQztJQUN4QixTQUFTLEVBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDO0NBQ3BCLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQTtBQUNqQixvREFBb0Q7QUFDcEQsa0JBQWUsa0JBQVEsQ0FBQyxLQUFLLENBQVMsT0FBTyxFQUFDLFdBQVcsQ0FBQyxDQUFBIn0=