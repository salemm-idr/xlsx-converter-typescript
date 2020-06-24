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
            var _this = this;
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
                                    else {
                                        setTimeout(function () {
                                            console.log("Moviendo Archivo! " + Xfile_1.name + " \uD83D\uDE2E");
                                            resolve(Xfile_1.name);
                                        }, 50);
                                    }
                                });
                            }
                        }
                    }).then(function (xfileName) { return _this.readFilex(xfileName); })];
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
                        console.log(xfileName, "en readfilex   🔧");
                        var exist = fs_1.default.existsSync(directoryPath + "/" + xfileName);
                        if (!exist) {
                            console.log("no existe lo vamos a asignar");
                            _this.workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
                                cellDates: true,
                            });
                            resolve(_this.workbook);
                        }
                        else {
                            _this.workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
                                cellDates: true,
                            });
                            setTimeout(function () {
                                console.log("leyendo el  archivo ✊ enviando a construir 🚧");
                                resolve(_this.workbook);
                            }, 200);
                        }
                    }).then(function (workbook) { return _this.constructWorkSheet(workbook); })];
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
                        setTimeout(function () { return console.log("construyendo sheet 🕵"); }, 300);
                        var tabs = workbook.SheetNames;
                        var worksheet;
                        console.log(tabs, "in filecall 👌");
                        var daFile = tabs.map(function (tab, index) {
                            var toSave = {};
                            worksheet = workbook.Sheets[tab];
                            console.log(tab, "nombre de la tabla individual 🚀");
                            //* llama nueva funcion
                            //! this.createHeader(worksheet);
                            //* sin azincronia
                            var data = xlsx_1.default.utils.sheet_to_json(worksheet, {
                                header: 1,
                            });
                            toSave.name = tab;
                            toSave.hojaAoA = data;
                            return toSave;
                        });
                        setTimeout(function () {
                            console.log("termina de construir worksheet ⏬ estableciendo llaves");
                            resolve(daFile.shift());
                        }, 400);
                    }).then(function (fileObj) { return _this.writeJsonToFolder(fileObj); })];
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
                            else
                                reject("no se grabo el arhivo");
                        });
                        var nodos = dataWorked.map(function (nodo) {
                            var xFile = {};
                            nodo.forEach(function (elemento, index) {
                                xFile[_this.constructedSearch[index]] = elemento;
                            });
                            return xFile;
                        });
                        if (nodos) {
                            fs_1.default.writeFileSync("src/superjson/2zord.json", JSON.stringify(nodos));
                        }
                        setTimeout(function () {
                            console.log("Parametro de header construido ⤴️: 😱");
                            //resolve(nodos);
                        }, 600);
                    }).then(function (data) { return console.log(data, "de la respuesta"); })
                        .catch(function (error) { return console.error(error); })];
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
                        //guarda el objeto compuesto a una carpeta
                        fs_1.default.writeFileSync("src/superjson/2zord.json", JSON.stringify(nodos));
                        //console.log("nuevos nodos", nodos.slice(0,5))
                        nodos.forEach(function (item) {
                            var sheet = new Sheet_1.default({
                                item: item,
                            });
                            //sheet.save(); este guarda a la base
                        });
                        setTimeout(function () {
                            console.log("Armando json de escritura y guardando a la base 🚧");
                            resolve();
                        }, 700);
                    })];
            });
        });
    };
    FileCall.prototype.createHeader = function (worksheet) {
        return __awaiter(this, void 0, void 0, function () {
            var hd2, seccion;
            var _this = this;
            return __generator(this, function (_a) {
                hd2 = xlsx_1.default.utils.sheet_to_json(worksheet, { header: 1 });
                seccion = hd2.slice(0, 20);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var pre = seccion.map(function (row) {
                            if (row.length <= 9) {
                                _this.header = _this.header.concat([row]);
                                fs_1.default.writeFileSync("src/headers/test2.js", JSON.stringify(_this.header));
                            }
                            else
                                reject();
                        });
                        setTimeout(function () {
                            console.log("Creando el header de Caratula 📂");
                            resolve();
                        }, 2800);
                    }).then(function () { return _this.workis(_this.header); })];
            });
        });
    };
    FileCall.prototype.workis = function (seccion) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("llegando a workis", seccion);
                return [2 /*return*/];
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFFakQsOENBQXdCO0FBQ3hCLDBEQUFnRCxDQUFDLG9CQUFvQjtBQUNyRSwwQ0FBb0I7QUFHcEIsSUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUtsRDtJQVlFO1FBWEEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBb0MsRUFBRSxDQUFDO0lBWTdDLENBQUM7SUFSTSxtQkFBVSxHQUFqQixVQUFrQixJQUFtQztRQUNuRCxPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFLLElBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFLRDs7OztPQUlHO0lBQ1UsMkJBQVEsR0FBckIsVUFBc0IsS0FBbUI7Ozs7Z0JBQ3ZDLHNCQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEvQixDQUErQixFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTs0QkFDN0IsSUFBSSxPQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQUssQ0FBQyxFQUFFO2dDQUM5QixPQUFLLENBQUMsRUFBRSxDQUFJLGFBQWEsU0FBSSxPQUFLLENBQUMsSUFBTSxFQUFFLFVBQUMsR0FBRztvQ0FDN0MsSUFBSSxH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