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
var stream_1 = require("stream");
var directoryPath = path_1.default.join(__dirname, "..\\uploads");
var FileCall = /** @class */ (function () {
    function FileCall() {
        this.constructedSearch = [];
    }
    FileCall.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    FileCall.prototype.moveFile = function (xfile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("moviendo archivo"); }, 200);
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("leyendo el  archivo ✊"); }, 200);
                        console.log(xfileName, "en readfilex   🔧");
                        var workbook = xlsx_1.default.readFile(directoryPath + "\\" + xfileName, {
                            cellDates: true
                        });
                        if (workbook === undefined) {
                            reject(new Error("no pueod leer el archivo"));
                        }
                        else
                            resolve(workbook);
                    })];
            });
        });
    };
    FileCall.prototype.constructWorkSheet = function (workbook) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("construyendo sheet 🕵"); }, 200);
                        var tabs = workbook.SheetNames;
                        var worksheet;
                        console.log(tabs, "in filecall 👌");
                        var daFile = tabs.map(function (tab, index) {
                            var toSave = {};
                            worksheet = workbook.Sheets[tab];
                            console.log(tab, "nombre de la tabla individual 🚀");
                            var data = xlsx_1.default.utils.sheet_to_json(worksheet, {
                                header: 1
                            });
                            // let data = xlsx.stream.to_json(worksheet, { header: 1 });
                            toSave.name = tab;
                            toSave.hojaAoA = data;
                            return toSave;
                        });
                        resolve(daFile);
                    })];
            });
        });
    };
    FileCall.prototype.writeJsonToFolder = function (wrote) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("Escribiendo nuevo AoA 🖨"); }, 200);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fs_1.default.writeFileSync("src\\outputs\\" + wrote[0].name + ".json", JSON.stringify(wrote[0].hojaAoA, null, 2));
                        resolve(wrote[0].name);
                    })];
            });
        });
    };
    FileCall.prototype.readJsonFromFolder = function (fileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("leyendo archivo"); }, 500);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var grabado = fs_1.default.readFileSync("src\\outputs\\" + fileName + ".json", "utf8");
                        var datas = JSON.parse(grabado);
                        console.log("largo de datas", datas.length);
                        resolve(datas);
                    })];
            });
        });
    };
    FileCall.prototype.constructNewJson = function (grabado) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("Refactorizando json 🔧"); }, 200);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var dataWorked = [];
                        grabado.forEach(function (element, index) {
                            var texted = element.map(function (innerText) {
                                if (typeof innerText === "string") {
                                    var recortado = innerText
                                        .toUpperCase()
                                        .trim()
                                        .replace(/t\r\n\s+/g, "");
                                    return recortado;
                                }
                            });
                            if (texted.includes("TELEFONO") === true) {
                                _this.constructedSearch = texted;
                                dataWorked = grabado.slice(index + 1);
                                //return setTimeout(() => resolve(dataWorked), 600);
                                return dataWorked;
                            }
                        });
                        resolve(dataWorked);
                    })];
            });
        });
    };
    FileCall.prototype.composeNewObject = function (dataWorked) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("Armando json de escritura 🚧"); }, 200);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nodos = dataWorked.map(function (nodo) {
                            var xFile = {};
                            nodo.forEach(function (elemento, index) {
                                xFile[_this.constructedSearch[index]] = elemento;
                            });
                            return xFile;
                        });
                        fs_1.default.writeFileSync("src\\tiras\\EXITO2callBack.json", JSON.stringify(nodos, null, 2));
                        console.log("grabando nuevo JSON ✍️");
                        resolve(nodos);
                    }).then(function (nodos) { return _this.writeNewExcel(nodos); })];
            });
        });
    };
    FileCall.prototype.writeNewExcel = function (nodos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("writefile entrance");
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("Escribe nuevo excel 👷"); }, 200);
                        var stream = xlsx_1.default.stream.to_json(nodos, { raw: true });
                        var conv = new stream_1.Transform({ writableObjectMode: true });
                        conv._transform = function (obj, e, cb) {
                            cb(null, JSON.stringify(obj) + "\n");
                        };
                        stream.pipe(conv);
                        conv.pipe(process.stdout);
                        /**crea el libro de trabajo */
                        var wb = xlsx_1.default.utils.book_new();
                        /**nombre de la hoja string */
                        var ws_name = "transformed";
                        /**crea la hoja de trabajo */
                        // let ws: WorkSheet = xlsx.stream.to_json();
                        /**junta el libro creado con la hoja  */
                        // xlsx.utils.book_append_sheet(wb, ws, ws_name);
                        /**escribe el libro en la ruta especifica */
                        //xlsx.writeFile(wb, "src\\constructedFile\\streamer.xlsx");
                        resolve(wb);
                    })]; //.then(res => console.log("Todo se ha guarado con exito 🙉 🙈 🙊"));
            });
        });
    };
    FileCall.prototype.doitAll = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filex, constructedWorkSheet, writeJson, readJson, newTable, newObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFilex(name)];
                    case 1:
                        filex = _a.sent();
                        return [4 /*yield*/, this.constructWorkSheet(filex)];
                    case 2:
                        constructedWorkSheet = _a.sent();
                        return [4 /*yield*/, this.writeJsonToFolder(constructedWorkSheet)];
                    case 3:
                        writeJson = _a.sent();
                        return [4 /*yield*/, this.readJsonFromFolder(writeJson)];
                    case 4:
                        readJson = _a.sent();
                        return [4 /*yield*/, this.constructNewJson(readJson)];
                    case 5:
                        newTable = _a.sent();
                        return [4 /*yield*/, this.composeNewObject(newTable)];
                    case 6:
                        newObject = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUN4QixpQ0FBOEQ7QUFHOUQsSUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsYUFBYSxDQUFDLENBQUM7QUFLMUQ7SUFTRTtRQVJBLHNCQUFpQixHQUFPLEVBQUUsQ0FBQztJQVFaLENBQUM7SUFOVCxtQkFBVSxHQUFqQixVQUFrQixJQUFtQztRQUNuRCxPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFLLElBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFJWSwyQkFBUSxHQUFyQixVQUFzQixLQUFtQjs7O2dCQUN2QyxzQkFBTyxJQUFJLE9BQU8sQ0FBUyxVQUFDLE9BQU8sRUFBRSxNQUFNO3dCQUN6QyxVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsRUFBL0IsQ0FBK0IsRUFBRSxHQUFHLENBQUMsQ0FBQzt3QkFDdkQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7NEJBQzdCLElBQUksT0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7NEJBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBSyxDQUFDLENBQUM7NEJBQ25CLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFLLENBQUMsRUFBRTtnQ0FDOUIsT0FBSyxDQUFDLEVBQUUsQ0FBSSxhQUFhLFVBQUssT0FBSyxDQUFDLElBQU0sRUFBRSxVQUFBLEdBQUc7b0NBQzdDLElBQUksR0FBRyxFQUFFO3dDQUNQLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFD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