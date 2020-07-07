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
var SingleSheet_1 = __importDefault(require("../models/SingleSheet"));
var fs_1 = __importDefault(require("fs"));
var directoryPath = path_1.default.resolve("src/uploads");
var FileConverter = /** @class */ (function () {
    function FileConverter(xlsxFile) {
        this.constructedSearch = [];
        this.header = [];
        //header:[]=[];
        this.fileJsonName = "";
        this.dataworked = [];
        this.workSheet = Object;
        this.nodos = [];
        this.xlsxFile = xlsxFile;
    }
    FileConverter.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    /**
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
                                    _this.fileJsonName = file.name;
                                    resolve(_this.fileJsonName);
                                }, 1000);
                            }
                        });
                    })];
            });
        });
    };
    /**
     * @parm xfileName target the file name and us it for check acces on fs
     * @var workbook  read the file xlsx and save it to the top level
     *
     */
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
                    })];
            });
        });
    };
    /**
     *
     * @param workbook came from await converter call equivalet to xlsx file ready to being treated
     * @var worksheet  store one tab at the time from the xlsx
     */
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
                            _this.workSheet = worksheet;
                        }, 1600);
                    })];
            });
        });
    };
    /**
     *
     * @param wrote contain all the data from the xlsx in a better formar to javascript proccessing
     * @function jsonTreatment extract from AoA (Array of Arrays) and pass for string proccess
     * @var dataworked grep all the info from being apart
     * @this constructedSearch save the piece of code who be the part for construct new object
     */
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
                                return dataWorked;
                            }
                            else if (!texted) {
                                reject("no se grabo el arhivo");
                            }
                        });
                        setTimeout(function () {
                            console.log("Tratamiento de json terminado 👌 😏");
                            resolve(dataWorked);
                        }, 1700);
                    })
                        /* .then((dataworked) => {
                          this.composeObject(dataworked);
                        }) */
                        .catch(function (error) {
                        return console.log("No se ha podido leer el parametro de busqueda" + error);
                    })];
            });
        });
    };
    /**
     *
     * @param dataWorked ready for being proccessig searching for a doble nested array and make a fusion to consruct new object
     * @var nodos now carry on all the merged JSON with columns an row from the xlsx depurated and clean
     * @resolve nodos to return the Promise with the new json
     * @then take the las resolve JSON an write to fs the new object
     * @then this.createHeader call for the function
     */
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
                        fs_1.default.writeFileSync("src/superjson/" + _this.fileJsonName.split(".")[0] + ".json", JSON.stringify(nodos, null, 2), { flag: "a+" });
                        setTimeout(function () {
                            resolve({ nodos: nodos, message: console.log("a la verga si funciono") });
                        }, 2300);
                    })
                        .then(function () { console.log("mierda chingadamadre"); _this.createHeader(); })
                        .catch(function (error) {
                        return console.log("No se puede mapear el dataworked " + error);
                    })];
            });
        });
    };
    /**
     * @var faceKey contain a new array of strings extracted for the previous xlsx createing a header for a better search and data manipulation
     * @var hd2 treat @var worksheet createing a new AoA(Array of Arrays)
     * @var seccion extract just the first 20 ocurence for the xlsx  map it and fill the @this.header
     * @this header finally being proccess with tge triforce .reduce().filter().map() for search keywords
     * @resolve to exit promes
     * @then write the new file in one array with keywords
     */
    FileConverter.prototype.createHeader = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var faceKey = [];
                        var hd2 = xlsx_1.default.utils.sheet_to_json(_this.workSheet, { header: 1 });
                        var seccion = hd2.slice(0, 20);
                        seccion.map(function (row) {
                            if (row.length <= 9) {
                                _this.header = _this.header.concat([row]);
                            }
                        });
                        _this.header
                            .reduce(function (acc, currValue) {
                            return acc.concat(currValue);
                        }, [])
                            .filter(Boolean)
                            .map(function (item) {
                            var tag = item.toString().trim().toUpperCase().split(":");
                            //console.log(tag)
                            tag.forEach(function (tag) {
                                if (tag === "NOMBRE")
                                    return (faceKey = faceKey.concat([tag]));
                                if (tag === "DIRECCIÓN")
                                    return (faceKey = faceKey.concat([tag]));
                                if (tag === "PLATAFORMA")
                                    return (faceKey = faceKey.concat([tag]));
                                if (tag === "FECHA ACTIVACIÓN")
                                    return (faceKey = faceKey.concat([tag]));
                                if (tag === "IMSI")
                                    return (faceKey = faceKey.concat([tag]));
                                if (tag.includes("LÍNEA") === true) {
                                    var splited = tag.split(" ");
                                    return (faceKey = faceKey.concat([splited[0]]));
                                }
                            });
                        });
                        console.log(faceKey, "final fantasy");
                        resolve(_this.header);
                        setTimeout(function () {
                            console.log("Creando el header de Caratula 📂");
                            resolve();
                        }, 2800);
                    }).then(function (header) {
                        fs_1.default.writeFileSync("src/headers/" + _this.fileJsonName.split(".")[0] + "Header.js", JSON.stringify(header, null, 2));
                    })];
            });
        });
    };
    /**
   *
   * @param nodos came from promes of composeObject ready to grep an save to the database
   */
    FileConverter.prototype.writeTodb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("si llegamos a writeTodb!!!", Object.keys(this.nodos).length);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var pice = _this.nodos.slice(0, 10);
                        pice.forEach(function (item) {
                            console.log(item, "en la funcion de la cola");
                            var sheet = SingleSheet_1.default.create({ item: item });
                        });
                    }).then(function () { return console.log("Guardado a la base listo ✅"); })];
            });
        });
    };
    return FileConverter;
}()); //end of class
exports.FileConverter = FileConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYWxsdXAvRmlsZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWlEO0FBRWpELDhDQUF3QjtBQUN4QixzRUFBNEQ7QUFFNUQsMENBQW9CO0FBR3BCLElBQU0sYUFBYSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFLbEQ7SUFnQkUsdUJBQVksUUFBYTtRQWZ6QixzQkFBaUIsR0FBTyxFQUFFLENBQUM7UUFDM0IsV0FBTSxHQUFTLEVBQUUsQ0FBQztRQUNsQixlQUFlO1FBQ2YsaUJBQVksR0FBVSxFQUFFLENBQUM7UUFDekIsZUFBVSxHQUFPLEVBQUUsQ0FBQztRQUVwQixjQUFTLEdBQWMsTUFBTSxDQUFDO1FBRTlCLFVBQUssR0FBSSxFQUFFLENBQUM7UUFRVixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBUk0sd0JBQVUsR0FBakIsVUFBa0IsSUFBbUM7UUFDbkQsT0FBTyxDQUNMLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSyxJQUFxQixDQUFDLElBQUksS0FBSyxTQUFTLENBQ3RFLENBQUM7SUFDSixDQUFDO0lBTUQ7OztPQUdHO0lBRVUsZ0NBQVEsR0FBckI7Ozs7Z0JBQ0Usc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ25CLElBQUEsMEJBQUksQ0FBbUI7d0JBQy9CLElBQUksQ0FBQyxFQUFFLENBQUksYUFBYSxTQUFJLElBQUksQ0FBQyxJQUFNLEVBQUUsVUFBQyxHQUFROzRCQUNoRCxJQUFJLEdBQUcsRUFBRTtnQ0FDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdB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