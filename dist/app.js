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
// "mongodb://salemm:salemm2019@ds023603.mlab.com:23603/caska-db"
mongoose_1.default
    .connect("mongodb://localhost/xfile", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(function (x) {
    console.log("Conectado a mongo database \uD83C\uDFD7 named: " + x.connections[0].name);
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
    console.log("ready for action on " + process.env.PORT + "  \uD83D\uDE80 \uD83D\uDD25");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUErQztBQUMvQyw4Q0FBd0I7QUFDeEIscURBQStCO0FBQy9CLDREQUFxQztBQUNyQywwRUFBNEM7QUFDNUMsc0RBQWdDO0FBQ2hDLGlFQUFpRTtBQUNqRSxrQkFBUTtLQUNQLE9BQU8sQ0FDUCwyQkFBMkIsRUFBQztJQUN6QixlQUFlLEVBQUMsSUFBSTtJQUNwQixrQkFBa0IsRUFBQyxJQUFJO0NBQ3hCLENBQUM7S0FDRCxJQUFJLENBQUMsVUFBQSxDQUFDO0lBQUssT0FBTyxDQUFDLEdBQUcsQ0FDckIsb0RBQXdDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBTSxDQUNoRSxDQUFBO0FBQ0QsQ0FBQyxDQUFDO0tBQ0QsS0FBSyxDQUFDLFVBQUEsS0FBSztJQUNWLE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDN0QsQ0FBQyxDQUFDLENBQUE7QUFFSixJQUFNLEdBQUcsR0FBb0IsaUJBQU8sRUFBRSxDQUFDO0FBQ3ZDLHVDQUF1QztBQUN2QyxHQUFHLENBQUMsR0FBRyxDQUNMLDRCQUFVLENBQUM7SUFDVCxZQUFZLEVBQUUsSUFBSTtDQUVuQixDQUFDLENBQ0gsQ0FBQztBQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQzNCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25ELEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztBQUVuQyxHQUFHLENBQUMsR0FBRyxDQUFDLFVBQVMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJO0lBQzdCLDZCQUE2QjtJQUM3QixHQUFHLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ2xELEdBQUcsQ0FBQyxNQUFNLENBQUMsOEJBQThCLEVBQUUsaUNBQWlDLENBQUMsQ0FBQztJQUM5RSxHQUFHLENBQUMsTUFBTSxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLEdBQUcsQ0FBQyxNQUFNLENBQ1IsOEJBQThCLEVBQzlCLDZFQUE2RSxDQUM5RSxDQUFDO0lBQ0YsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQztBQUNILDJFQUEyRTtBQUMzRSxhQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRXBCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRXRELEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7SUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBdUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLGdDQUFTLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMsQ0FBQyJ9