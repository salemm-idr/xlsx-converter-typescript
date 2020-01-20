"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.prototype.convert = function (req, res) {
        console.log("you made it !!");
    };
    return Converter;
}());
exports.Converter = Converter;
