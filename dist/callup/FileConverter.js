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
                    })
                    /* .then(workbook => this.constructWorkSheet(workbook)) */
                ];
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
                        }, 2000);
                    })
                        .then(function (dataworked) {
                        _this.composeObject(dataworked);
                    })
                        .catch(function (error) { return console.log("No se ha podido leer el parametro de busqueda" + error); })];
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
                        setTimeout(function () {
                            resolve(nodos);
                        }, 2300);
                    })
                        .then(function (nodos) {
                        console.log("datos guardados");
                        fs_1.default.writeFileSync("src/superjson/zordTest08.json", JSON.stringify(nodos, null, 2), { flag: "a+" });
                    })
                        .then(function () { return _this.createHeader(); })
                        .catch(function (error) { return console.log("No se puede mapear el dataworked " + error); })];
            });
        });
    };
    /**
     *
     * @param nodos came from promes of composeObject ready to grep an save to the database
     */
    FileConverter.prototype.writeTodb = function (nodos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                //fs.writeFileSync("src/superjson/zordTest02.json",JSON.stringify(nodos,null,2))
                console.log(Object.keys(nodos).length);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        /*      nodos.forEach((item:object) => {
                              const sheet =   Sheet.create({item});
                              //sheet.save(); // este guarda a la base
                            });
                            resolve() */
                    }).then(function () { return console.log("Guardado a la base listo ✅"); })];
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
                        _this.header.reduce(function (acc, currValue) {
                            return acc.concat(currValue);
                        }, [])
                            .filter(Boolean)
                            .map(function (item) {
                            var tag = item.toString().trim().toUpperCase().split(":");
                            //console.log(tag)
                            tag.forEach(function (tag) {
                                if (tag === "NOMBRE")
                                    return faceKey = faceKey.concat([tag]);
                                if (tag === "DIRECCIÓN")
                                    return faceKey = faceKey.concat([tag]);
                                if (tag === "PLATAFORMA")
                                    return faceKey = faceKey.concat([tag]);
                                if (tag === "FECHA ACTIVACIÓN")
                                    return faceKey = faceKey.concat([tag]);
                                if (tag === "IMSI")
                                    return faceKey = faceKey.concat([tag]);
                                if (tag.includes("LÍNEA") === true) {
                                    var splited = tag.split(' ');
                                    return faceKey = faceKey.concat([splited[0]]);
                                }
                            });
                        });
                        console.log(faceKey, "final fantasy");
                        resolve(_this.header);
                        setTimeout(function () {
                            console.log("Creando el header de Caratula 📂");
                            resolve();
                        }, 2800);
                    }).then(function (header) { return fs_1.default.writeFileSync("src/headers/test07.js", JSON.stringify(header, null, 2)); })];
            });
        });
    };
    return FileConverter;
}()); //end of class
exports.FileConverter = FileConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYWxsdXAvRmlsZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOENBQWlEO0FBRWpELDhDQUF3QjtBQUV4QiwwQ0FBb0I7QUFHcEIsSUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQU1sRDtJQWNFLHVCQUFZLFFBQVk7UUFieEIsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO1FBQzNCLFdBQU0sR0FBTyxFQUFFLENBQUM7UUFDaEIsZUFBZTtRQUNmLGVBQVUsR0FBSSxFQUFFLENBQUE7UUFFaEIsY0FBUyxHQUFhLE1BQU0sQ0FBQztRQVM3QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQTtJQUN4QixDQUFDO0lBUk0sd0JBQVUsR0FBakIsVUFBa0IsSUFBbUM7UUFDbkQsT0FBTyxDQUNMLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSyxJQUFxQixDQUFDLElBQUksS0FBSyxTQUFTLENBQ3RFLENBQUM7SUFDSixDQUFDO0lBTUQ7OztPQUdHO0lBRVUsZ0NBQVEsR0FBckI7Ozs7Z0JBQ0Esc0JBQVMsSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUMsTUFBTTt3QkFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7d0JBQ25CLElBQUEsMEJBQUksQ0FBaUI7d0JBQzVCLElBQUksQ0FBQyxFQUFFLENBQUksYUFBYSxTQUFJLElBQUksQ0FBQyxJQUFNLEVBQUUsVUFBQyxHQUFPOzRCQUMvQyxJQUFJLEdBQUcsRUFBRTtnQ0FDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dDQUNqQixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFD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