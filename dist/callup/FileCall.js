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
var path_1 = __importDefault(require("path"));
var Sheet_1 = __importDefault(require("../models/Sheet")); //lleva la interface
var fs_1 = __importDefault(require("fs"));
var directoryPath = path_1.default.resolve("src/uploads");
var FileCall = /** @class */ (function () {
    function FileCall() {
        this.constructedSearch = [];
        this.header = [];
    }
    FileCall.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    /**
     *
     * @param xfile objeto del navegador tipo xlsx
     * @returns xFile.name nombre del archivo
     */
    FileCall.prototype.moveFile = function (xfile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("moviendo archivo"); }, 200);
                        if (typeof xfile === "object") {
                            var Xfile_1 = xfile.file;
                            console.log(Xfile_1);
                            if (FileCall.isUploaded(Xfile_1)) {
                                Xfile_1.mv(directoryPath + "/" + Xfile_1.name, function (err) {
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
    /**
     *
     * @param xfileName nombre del archivo movido a la carpeta uploads
     * @return promesa WorkBook
     */
    FileCall.prototype.readFilex = function (xfileName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("leyendo el  archivo ✊"); }, 200);
                        console.log(xfileName, "en readfilex   🔧");
                        var exist = fs_1.default.existsSync(directoryPath + "/" + xfileName);
                        if (!exist) {
                            console.log("no existe lo vamos a asignar");
                            _this.workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
                                cellDates: true
                            });
                            resolve(_this.workbook);
                        }
                        else {
                            _this.workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
                                cellDates: true
                            });
                            resolve(_this.workbook);
                        }
                        // if (workbook === undefined) {
                        //   reject(new Error("no pueod leer el archivo"));
                        // } else resolve(workbook);
                    }).then()];
            });
        });
    };
    /**
     * @param workbook de libreria xlsx archivo convertido para proceso
     *   construye un workseeht de la lectura a AoA(arreglo de arreglos)
     *  @returns promesa de objeto
     */
    FileCall.prototype.constructWorkSheet = function (workbook) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
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
                            //* llama nueva funcion
                            _this.createHeader(worksheet);
                            //* sin azincronia
                            var data = xlsx_1.default.utils.sheet_to_json(worksheet, {
                                header: 1
                            });
                            toSave.name = tab;
                            toSave.hojaAoA = data;
                            return toSave;
                        });
                        setTimeout(function () {
                            console.log("termina de construir worksheet ⏬");
                            resolve(daFile.shift());
                        }, 2800);
                    })];
            });
        });
    };
    /**
     * @param wrote objecto compuesto de nombre y data de la hoja de xlsx
     * @returns promsa de string
     */
    FileCall.prototype.writeJsonToFolder = function (wrote) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var dataWorked = [];
                        wrote.hojaAoA.forEach(function (element, index) {
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
                                dataWorked = wrote.hojaAoA.slice(index + 1);
                                return dataWorked;
                            }
                        });
                        setTimeout(function () {
                            console.log("Parametro de header construido ⤴️");
                            resolve(dataWorked);
                        }, 2700);
                    }).then(function (dataWorked) { return _this.composeNewObject(dataWorked); })];
            });
        });
    };
    /**
     * @param this.constructedSearch es el valor creado del header extraido de el AoA
     * para usar como parametro de columnas
     *
     * @param dataWorked data cruda para construir el json que sera un xlsx
     */
    FileCall.prototype.composeNewObject = function (dataWorked) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nodos = dataWorked.map(function (nodo) {
                            var xFile = {};
                            nodo.forEach(function (elemento, index) {
                                xFile[_this.constructedSearch[index]] = elemento;
                            });
                            return xFile;
                        });
                        //console.log("nuevos nodos", nodos.slice(0,5))
                        nodos.forEach(function (item) {
                            var sheet = new Sheet_1.default({
                                item: item
                            });
                            //sheet.save(); este guarda a la base
                        });
                        setTimeout(function () {
                            console.log("Armando json de escritura y guardando a la base 🚧");
                            resolve();
                        }, (process.exit(0), 2600));
                    })];
            });
        });
    };
    FileCall.prototype.createHeader = function (worksheet) {
        var _this = this;
        //!test
        var hd = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 0, blankrows: true });
        //console.log(hd.slice(0,10))
        var seccion = hd.slice(0, 10);
        seccion.map(function (row, i) {
            //console.log(row)
            console.log(row[0]);
            if (row.length <= 9) {
                _this.header = _this.header.concat([row]);
                //console.log(this.header,"construido")
                //fs.writeFileSync("src/arrayof/test5.js",JSON.stringify(this.header))
            }
        });
        //!test
    };
    /**
     *
     * @param name nombre del archivo que inicia la funcion que llama a las principales
     * viene de el archivo de la funcion
     * @class Converter del archivo ./controller/converter
     *
     */
    FileCall.prototype.doitAll = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filex, constructedWorkSheet, writeJson;
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
                        return [2 /*return*/, [filex, constructedWorkSheet, writeJson]];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFFakQsOENBQXdCO0FBQ3hCLDBEQUFnRCxDQUFDLG9CQUFvQjtBQUNyRSwwQ0FBbUI7QUFFbkIsSUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUtsRDtJQVdFO1FBVkEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBaUMsRUFBRSxDQUFDO0lBUzNCLENBQUM7SUFOVCxtQkFBVSxHQUFqQixVQUFrQixJQUFtQztRQUNuRCxPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFLLElBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFHRDs7OztPQUlHO0lBQ1UsMkJBQVEsR0FBckIsVUFBc0IsS0FBbUI7OztnQkFDdkMsc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDekMsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQS9CLENBQStCLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3ZELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixJQUFJLE9BQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNuQixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBSyxDQUFDLEVBQUU7Z0NBQzlCLE9BQUssQ0FBQyxFQUFFLENBQUksYUFBYSxTQUFJLE9BQUssQ0FBQyxJQUFNLEVBQUUsVUFBQSxHQUFHO29DQUM1QyxJQUFJLEdB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