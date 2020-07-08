"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var Api_1 = __importDefault(require("./routes/Api"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var mongoose_1 = __importDefault(require("mongoose"));
// "mongodb://salemm:salemm2019@ds023603.mlab.com:23603/caska-db"
mongoose_1.default
    .connect("mongodb://localhost:27017/xfile", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function (x) {
    console.log("Conectado a mongo database \uD83D\uDD3D  named: " + x.connections[0].name);
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
app.listen(process.env.PORT, function () {
    console.log("ready for action on " + process.env.PORT + " \uD83D\uDE80 \uD83D\uDD25");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUMxQixvREFBK0M7QUFDL0MsOENBQXdCO0FBQ3hCLHFEQUErQjtBQUMvQiw0REFBcUM7QUFDckMsMEVBQTRDO0FBQzVDLHNEQUFnQztBQUVoQyxpRUFBaUU7QUFDakUsa0JBQVE7S0FDUCxPQUFPLENBQ1AsaUNBQWlDLEVBQUM7SUFDL0IsZUFBZSxFQUFDLElBQUk7SUFDcEIsa0JBQWtCLEVBQUMsSUFBSTtDQUN4QixDQUFDO0tBQ0QsSUFBSSxDQUFDLFVBQUEsQ0FBQztJQUFLLE9BQU8sQ0FBQyxHQUFHLENBQ3JCLHFEQUF5QyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQU0sQ0FDakUsQ0FBQTtBQUNELENBQUMsQ0FBQztLQUNELEtBQUssQ0FBQyxVQUFBLEtBQUs7SUFDVixPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxFQUFFLEtBQUssQ0FBQyxDQUFBO0FBQzdELENBQUMsQ0FBQyxDQUFBO0FBRUosSUFBTSxHQUFHLEdBQW9CLGlCQUFPLEVBQUUsQ0FBQztBQUN2Qyx1Q0FBdUM7QUFDdkMsR0FBRyxDQUFDLEdBQUcsQ0FDTCw0QkFBVSxDQUFDO0lBQ1QsWUFBWSxFQUFFLElBQUk7Q0FFbkIsQ0FBQyxDQUNILENBQUM7QUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFbkMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUM3Qiw2QkFBNkI7SUFDN0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNsRCxHQUFHLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLGlDQUFpQyxDQUFDLENBQUM7SUFDOUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsTUFBTSxDQUNSLDhCQUE4QixFQUM5Qiw2RUFBNkUsQ0FDOUUsQ0FBQztJQUNGLElBQUksRUFBRSxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDSCwyRUFBMkU7QUFDM0UsYUFBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUVwQixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsTUFBTSxDQUFDLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUV0RCxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSwrQkFBUSxDQUFDLENBQUM7QUFDL0QsQ0FBQyxDQUFDLENBQUMifQ==