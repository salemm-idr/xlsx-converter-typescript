"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
    FileCall.prototype.moveFile = function (xfile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (typeof xfile === "object") {
                            var Xfile_1 = xfile.file;
                            console.log(Xfile_1);
                            if (FileCall.isUploaded(Xfile_1)) {
                                Xfile_1.mv(directoryPath + "\\" + Xfile_1.name, function (err) {
                                    if (err) {
                                        console.log(err);
                                        reject(new Error("No se ha movido el archivo ⚠️"));
                                    }
                                    else
                                        resolve(Xfile_1.name);
                                });
                            }
                        }
                    })];
            });
        });
    };
    FileCall.prototype.readFilex = function (xfileName) {
        try {
            return new Promise(function (resolve, reject) {
                console.log(xfileName, "en readfilex   🔧");
                var workbook = xlsx_1.default.readFile(directoryPath + "\\" + xfileName, {
                    cellDates: true
                });
                console.log("propiedades", workbook.SheetNames);
                resolve(workbook);
                // const { Sheets } = workbook;
                // if (Object.entries(Sheets).length === 0) {
                //   console.log("el objeto viene vacio al leer el archivo");
                //   reject(workbook);
                // } else resolve(workbook);
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    FileCall.prototype.constructWorkSheet = function (workbook) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tabs = workbook.SheetNames;
            console.log(tabs, "in filecall 👌");
            tabs.forEach(function (tab) {
                var worksheet = workbook.Sheets[tab];
                console.log(tab, "nombre de la tabla individual 🚀");
                var data = xlsx_1.default.utils.sheet_to_json(worksheet);
                _this.writeJsonToFolder(data, tab);
            });
        });
    };
    FileCall.prototype.writeJsonToFolder = function (data, name) {
        return new Promise(function (resolve, reject) {
            fs_1.default.writeFileSync("src\\outputs\\" + name + ".json", JSON.stringify(data, null, 2));
        });
    };
    FileCall.prototype.doitAll = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filex, contructedWorkSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(name);
                        return [4 /*yield*/, this.readFilex(name)];
                    case 1:
                        filex = _a.sent();
                        return [4 /*yield*/, this.constructWorkSheet(filex)];
                    case 2:
                        contructedWorkSheet = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
