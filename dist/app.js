"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var Api_1 = __importDefault(require("./routes/Api"));
var body_parser_1 = require("body-parser");
var app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(express_1.default.static(__dirname));
var directoryPath = path_1.default.join(__dirname, "uploads");
var directoryOut = path_1.default.join(__dirname, "outputs");
var transformedJson = path_1.default.join(__dirname, "transformed");
app.use(function (req, res, next) {
    //allow cross origin requests
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});
//
Api_1.default.initialize(app);
//app.use("/api", converter);
app.use(express_1.default.static(path_1.default.join(__dirname, "dist")));
app.listen(4200, function () {
    console.log("ready for action on port 4200  \uD83D\uDD2A && \uD83D\uDD25");
});
