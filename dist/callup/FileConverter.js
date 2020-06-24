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
var fs_1 = __importDefault(require("fs"));
var directoryPath = path_1.default.resolve("src/uploads");
var FileConverter = /** @class */ (function () {
    function FileConverter(xlsxFile) {
        this.constructedSearch = [];
        this.header = [];
        //header:[]=[];
        this.dataworked = [];
        this.workSheet = Object;
        this.xlsxFile = xlsxFile;
    }
    FileConverter.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    /**
     *
     * @param xlsx objeto del navegador tipo xlsx
     * @returns xFile.name nombre del archivo
     */
    FileConverter.prototype.moveFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        console.log(_this.xlsxFile);
                        var file = _this.xlsxFile.file;
                        file.mv(directoryPath + "/" + file.name, function (err) {
                            if (err) {
                                console.log(err);
                                reject(console.error("No se ha movido el archivo ⚠️"));
                            }
                            else {
                                setTimeout(function () {
                                    console.log("Moviendo Archivo! " + file.name + " \uD83D\uDE2E");
                                    resolve(file.name);
                                }, 1000);
                            }
                        });
                    })
                    /* .then((xfileName:string) => this.readFilex(xfileName))
                    .catch((error)=> console.error(error)) */
                ];
            });
        });
    };
    FileConverter.prototype.readFilex = function (xfileName) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
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
                            }, 1300);
                        }
                    })
                    /* .then(workbook => this.constructWorkSheet(workbook)) */
                ];
            });
        });
    };
    FileConverter.prototype.constructWorkSheet = function (workbook) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var tabs = workbook.SheetNames;
                        var worksheet;
                        console.log(tabs, "in filecall 👌");
                        var daFile = tabs.map(function (tab) {
                            var toSave = {};
                            worksheet = workbook.Sheets[tab];
                            console.log(tab, "nombre de la tabla individual 🚀");
                            //* llama nueva funcion
                            //! this.createHeader(worksheet);
                            //! eleva el worksheet a variable para uso global 
                            _this.workSheet = worksheet;
                            //this.createHeader(worksheet);
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
                        }, 1600);
                    })
                    // .then(fileObj => this.writeJsonToFolder(fileObj))
                ];
            });
        });
    };
    FileConverter.prototype.jsonTreatment = function (wrote) {
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
                                resolve(wrote.hojaAoA.slice(index + 1));
                                console.log(_this.dataworked);
                                return _this.dataworked;
                            }
                            else if (!texted) {
                                reject("no se grabo el arhivo");
                            }
                        });
                        setTimeout(function () {
                            console.log("Tratamiento de json terminado 👌 😏");
                            resolve(dataWorked);
                        }, 2000);
                    })
                        .then(function () {
                        console.log("Enviando data a componer objeto");
                        //this.composeObject(this.dataworked)
                    })
                        .catch(function (error) { return console.log("No se ha podido leer el parametro de busqueda" + error); })];
            });
        });
    };
    FileConverter.prototype.composeObject = function (dataWorked) {
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
                        fs_1.default.writeFileSync("src/superjson/zordTest02.json", JSON.stringify(nodos));
                        setTimeout(function () {
                            console.log("datos guardados");
                            resolve(nodos);
                        }, 2300);
                    })
                        .then(function () { return console.log("DataWorked procesada!!"); })
                        .catch(function (error) { return console.log("No se puede mapear el dataworked " + error); })];
            });
        });
    };
    FileConverter.prototype.writeTodb = function (nodos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        /*  nodos.forEach((item:object) => {
                           const sheet: ISheet = new Sheet({
                             item,
                           });
                           sheet.save(); // este guarda a la base
                         }); */
                        resolve();
                    }).then(function () { return console.log("Guardado a la base listo ✅"); })];
            });
        });
    };
    FileConverter.prototype.createHeader = function () {
        var _this = this;
        console.log("en create header");
        var hd2 = xlsx_1.default.utils.sheet_to_json(this.workSheet, { header: 1 });
        var seccion = hd2.slice(0, 20);
        return new Promise(function (resolve, reject) {
            var pre = seccion.map(function (row) {
                if (row.length <= 9) {
                    _this.header = _this.header.concat([row]);
                    fs_1.default.writeFileSync("src/headers/test4.js", JSON.stringify(_this.header));
                }
                else
                    reject();
            });
            setTimeout(function () {
                console.log("Creando el header de Caratula 📂");
                resolve();
            }, 2800);
        });
    };
    return FileConverter;
}()); // fin de la clase 
exports.FileConverter = FileConverter;
//todo resolver el tipo de datos para pasar al metodo de guardado de objeto
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYWxsdXAvRmlsZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWlEO0FBRWpELDhDQUF3QjtBQUV4QiwwQ0FBb0I7QUFHcEIsSUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQU1sRDtJQWNFLHVCQUFZLFFBQVk7UUFieEIsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBb0MsRUFBRSxDQUFDO1FBQzdDLGVBQWU7UUFDZixlQUFVLEdBQTJCLEVBQUUsQ0FBQTtRQUV2QyxjQUFTLEdBQWEsTUFBTSxDQUFDO1FBUzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQ3hCLENBQUM7SUFSTSx3QkFBVSxHQUFqQixVQUFrQixJQUFtQztRQUNuRCxPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFLLElBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFLRDs7OztPQUlHO0lBQ1UsZ0NBQVEsR0FBckI7Ozs7Z0JBQ0Esc0JBQVMsSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUMsTUFBTTt3QkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7d0JBQ25CLElBQUEsMEJBQUksQ0FBaUI7d0JBQzVCLElBQUksQ0FBQyxFQUFFLENBQUksYUFBYSxTQUFJLElBQUksQ0FBQyxJQUFNLEVBQUUsVUFBQyxHQUFPOzRCQUMvQyxJQUFJLEdBQUcsRUFBRTtnQ0FDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxD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