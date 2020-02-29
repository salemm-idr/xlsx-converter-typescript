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
        this.constructedSearch = [];
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
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
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
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    FileCall.prototype.constructWorkSheet = function (workbook) {
        return new Promise(function (resolve, reject) {
            var tabs = workbook.SheetNames;
            var worksheet;
            console.log(tabs, "in filecall 👌");
            var daFile = tabs.map(function (tab, index) {
                var toSave = {};
                worksheet = workbook.Sheets[tab];
                console.log(tab, "nombre de la tabla individual 🚀");
                // let data = xlsx.utils.sheet_to_json(worksheet, {
                //   header: 1
                // });
                var data = xlsx_1.default.stream.to_json(worksheet, { header: 1 });
                toSave.name = tab;
                toSave.hojaAoA = data;
                return toSave;
            });
            resolve(daFile);
        });
    };
    FileCall.prototype.writeJsonToFolder = function (wrote) {
        return new Promise(function (resolve, reject) {
            fs_1.default.writeFileSync("src\\outputs\\" + wrote[0].name + ".json", JSON.stringify(wrote[0].hojaAoA, null, 2));
            var grabado = fs_1.default.readFileSync("src\\outputs\\" + wrote[0].name + ".json", "utf8");
            var datas = JSON.parse(grabado);
            resolve(datas);
        });
    };
    FileCall.prototype.constructNewJson = function (grabado) {
        var _this = this;
        return new Promise(function (resolve, reject) {
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
                    resolve(dataWorked);
                }
            });
        });
    };
    FileCall.prototype.composeNewObject = function (dataWorked) {
        var _this = this;
        return new Promise(function (resolve, reject) {
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
        });
    };
    FileCall.prototype.writeNewExcel = function (nodos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("writefile entrance");
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            /**crea el libro de trabajo */
                            var wb = xlsx_1.default.utils.book_new();
                            /**nombre de la hoja string */
                            var ws_name = "transformed";
                            /**crea la hoja de trabajo */
                            var ws = xlsx_1.default.utils.json_to_sheet(nodos);
                            /**junta el libro creado con la hoja  */
                            xlsx_1.default.utils.book_append_sheet(wb, ws, ws_name);
                            /**escribe el libro en la ruta especifica */
                            xlsx_1.default.writeFile(wb, "src\\constructedFile\\streamer.xlsx");
                            resolve(wb);
                        }
                        catch (error) {
                            new Error("No se ha podido guardar el archivo");
                            reject();
                        }
                    }).then(function (res) { return console.log("Todo se ha guarado con exito 🙉 🙈 🙊"); })];
            });
        });
    };
    FileCall.prototype.doitAll = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filex, constructedWorkSheet, writeJson, newTable, newObject, newExcel;
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
                        return [4 /*yield*/, this.constructNewJson(writeJson)];
                    case 4:
                        newTable = _a.sent();
                        return [4 /*yield*/, this.composeNewObject(newTable)];
                    case 5:
                        newObject = _a.sent();
                        return [4 /*yield*/, this.writeNewExcel(newObject)];
                    case 6:
                        newExcel = _a.sent();
                        console.log("Todo se ha guarado con exito 🙉 🙈 🙊");
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBMEU7QUFDMUUsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUd4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUsxRDtJQVNFO1FBUkEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO0lBUVosQ0FBQztJQU5ULG1CQUFVLEdBQWpCLFVBQWtCLElBQW1DO1FBQ25ELE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUssSUFBcUIsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUlZLDJCQUFRLEdBQXJCLFVBQXNCLEtBQW1COzs7Z0JBQ3ZDLHNCQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixJQUFJLE9BQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNuQixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBSyxDQUFDLEVBQUU7Z0NBQzlCLE9BQUssQ0FBQyxFQUFFLENBQUksYUFBYSxVQUFLLE9BQUssQ0FBQyxJQUFNLEVBQUUsVUFBQSxHQUFHO29DQUM3QyxJQUFJLEdBQUcsRUFBRTt3Q0FDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dDQUNqQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFDO3FDQUNwRDs7d0NBQU0sT0FBTyxDQUFDLE9BQUssQ0FBQyxJQUFJLENBQUMs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