"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var path_1 = __importDefault(require("path"));
var directoryPath = path_1.default.join(__dirname, "src/uploads");
var FileCall = /** @class */ (function () {
    function FileCall() {
    }
    FileCall.prototype.readFilex = function (xfileName) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var leidoexcel = xlsx_1.default.readFile("src\\uploads\\" + xfileName, {
                cellDates: true
            });
            //   resolve(leidoexcel);
            //   console.log(typeof leidoexcel, "lo lograste maldito hijo de perra");
            if (leidoexcel) {
                resolve(leidoexcel);
                _this.constructWorkSheet(leidoexcel);
            }
            else if (!leidoexcel) {
                reject(new Error("no se ha podido leer el archivo"));
            }
        });
    };
    FileCall.prototype.constructWorkSheet = function (filex) {
        console.log(filex, "en filecall");
        var tabs = filex.SheetNames;
        tabs.forEach(function (element) {
            console.log(element);
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
