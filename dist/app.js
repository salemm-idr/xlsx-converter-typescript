"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var Api_1 = __importDefault(require("./routes/Api"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default
    .connect("mongodb://localhost/xFileConverter", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function (x) {
    console.log("Conectado a mongo database \uD83D\uDE80 named: " + x.connections[0].name);
})
    .catch(function (error) {
    console.error("Error conectado con la base Mongo ❌", error);
});
var app = express_1.default();
//app.use(fileUpload({ debug: true }));
app.use(express_fileupload_1.default({
    useTempFiles: true,
}));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname));
app.use(function (req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
//*Give the power to initialize all the routes go for it on ./routes/Api.ts
Api_1.default.initialize(app);
app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
app.listen(4200, function () {
    console.log("ready for action on port 4200  \uD83D\uDE80 \uD83D\uDD25");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUErQztBQUMvQyw4Q0FBd0I7QUFDeEIscURBQStCO0FBQy9CLDREQUFxQztBQUNyQywwRUFBNEM7QUFDNUMsc0RBQWdDO0FBQ2hDLGtCQUFRO0tBQ1AsT0FBTyxDQUNOLG9DQUFvQyxFQUFDO0lBQ25DLGVBQWUsRUFBQyxJQUFJO0lBQ3BCLGtCQUFrQixFQUFDLElBQUk7Q0FDeEIsQ0FBQztLQUNELElBQUksQ0FBQyxVQUFBLENBQUM7SUFBSyxPQUFPLENBQUMsR0FBRyxDQUNyQixvREFBd0MsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFNLENBQ2hFLENBQUE7QUFDRCxDQUFDLENBQUM7S0FDRCxLQUFLLENBQUMsVUFBQSxLQUFLO0lBQ1YsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtBQUM3RCxDQUFDLENBQUMsQ0FBQTtBQUNKLElBQU0sR0FBRyxHQUFvQixpQkFBTyxFQUFFLENBQUM7QUFDdkMsdUNBQXVDO0FBQ3ZDLEdBQUcsQ0FBQyxHQUFHLENBQ0wsNEJBQVUsQ0FBQztJQUNULFlBQVksRUFBRSxJQUFJO0NBRW5CLENBQUMsQ0FDSCxDQUFDO0FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBRW5DLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7SUFDN0IsNkJBQTZCO0lBQzdCLEdBQUcsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyw4QkFBOEIsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO0lBQzlFLEdBQUcsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLE1BQU0sQ0FDUiw4QkFBOEIsRUFDOUIsNkVBQTZFLENBQzlFLENBQUM7SUFDRixJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0gsMkVBQTJFO0FBQzNFLGFBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFdEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUFzQyxDQUFDLENBQUM7QUFDdEQsQ0FBQyxDQUFDLENBQUMifQ==