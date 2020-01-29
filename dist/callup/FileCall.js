"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var directoryPath = path_1.default.join(__dirname, "..\\uploads");
var FileCall = /** @class */ (function () {
    function FileCall() {
    }
    FileCall.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    FileCall.moveFile = function (xfile) {
        return new Promise(function (resolve, reject) {
            if (typeof xfile === "object") {
                xfile = xfile.file;
                if (FileCall.isUploaded(xfile)) {
                    xfile.mv(directoryPath + "\\" + xfile.name, function (err) {
                        if (err) {
                            console.log(err);
                            reject(new Error("No se ha movido el archivo"));
                        }
                    });
                    resolve(xfile.name);
                }
            }
        });
    };
    FileCall.readFilex = function (xfileName) {
        return new Promise(function (resolve, reject) {
            var workbook = xlsx_1.default.readFile(directoryPath + "\\" + xfileName, {
                cellDates: true,
                type: "array"
            });
            resolve(workbook);
        });
    };
    FileCall.constructWorkSheet = function (workbook) {
        return new Promise(function (resolve, reject) {
            var tabs = workbook.SheetNames;
            console.log(tabs, "in filecall");
            tabs.map(function (tab) {
                var worksheet = workbook.Sheets[tab];
                var data = xlsx_1.default.utils.sheet_to_json(worksheet, { header: tabs });
                var dataRes = { data: data, name: tab };
                resolve(dataRes);
            });
        });
    };
    FileCall.writeJsonToFolder = function (ws) {
        return new Promise(function (resolve, reject) {
            fs_1.default.writeFileSync("src\\outputs\\" + ws.name + ".json", JSON.stringify(ws.data, null, 2));
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
