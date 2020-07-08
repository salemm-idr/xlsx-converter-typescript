"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var jsonPath = path_1.default.resolve("src/superjson");
var headerPath = path_1.default.resolve("src/headers");
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
                                    resolve({
                                        message: "Moviendo Archivo!",
                                        payload: _this.fileJsonName,
                                    });
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
                        if (exist) {
                            console.log("no existe lo vamos a asignar ✋");
                            _this.workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
                                cellDates: true,
                            });
                            setTimeout(function () {
                                console.log("Leyendo el  archivo ✊ enviando a construir 🚧");
                                resolve({
                                    message: "Leyendo el archivo para construir",
                                    payload: _this.workbook,
                                });
                            }, 1500);
                        }
                        else {
                            _this.workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
                                cellDates: true,
                            });
                            setTimeout(function () {
                                console.log("Leyendo el  archivo ✊ enviando a construir 🚧");
                                resolve({
                                    message: "Leyendo el archivo para construir",
                                    payload: _this.workbook,
                                });
                            }, 1500);
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
                            // let toSave = {} as toWrite;
                            worksheet = workbook.Sheets[tab];
                            console.log(tab, "nombre de la tabla individual 🚀");
                            var data = xlsx_1.default.utils.sheet_to_json(worksheet, {
                                header: 1, blankrows: false, defval: "nodefinida"
                            });
                            return data;
                            /*   toSave.name = tab;
                            toSave.hojaAoA = data;
                            return toSave;
                            alternative = daFile.shift()
                            */
                        });
                        setTimeout(function () {
                            console.log("termina de construir worksheet ⏬ estableciendo llaves");
                            resolve({
                                message: "termina de construir worksheet ⏬ estableciendo llaves",
                                payload: daFile.shift(),
                            });
                            _this.workSheet = worksheet;
                        }, 2000);
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
    FileConverter.prototype.jsonTreatment = function (aoa) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                //<(string | number | boolean)[]>
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var dataWorked = [];
                        aoa.forEach(function (element, index) {
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
                                console.log(_this.constructedSearch);
                                _this.dataworked = aoa.slice(index + 1);
                                console.log(_this.dataworked.slice(0, 1));
                                //resolve(wrote.hojaAoA.slice(index + 1));
                                //return dataWorked;
                            }
                            else if (!texted) {
                                reject("La Palabra Telefono o TELEFONO no es lejible en el archivo 😪");
                            }
                        });
                        setTimeout(function () {
                            console.log("Tratamiento de json terminado 👌 😏");
                            resolve({
                                message: "Tratamiento de json terminado 👌 😏",
                                payload: _this.dataworked,
                            });
                        }, 2500);
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
                        var exist = fs_1.default.existsSync(jsonPath + "/" + _this.fileJsonName.split(".")[0] + ".json");
                        if (exist) {
                            console.log("no existe vamos a grabarlo ✋");
                            fs_1.default.writeFileSync(jsonPath + "/" + _this.fileJsonName.split(".")[0] + ".json", JSON.stringify(nodos, null, 2), { flag: "a+" });
                            setTimeout(function () {
                                resolve({
                                    message: "Se ha guardado un nuevo objeto al sistema de archivos 📨 ",
                                    payload: nodos,
                                });
                            }, 3000);
                        }
                        else {
                            console.log("Sigamos adelante 👉");
                            fs_1.default.writeFileSync(jsonPath + "/" + _this.fileJsonName.split(".")[0] + ".json", JSON.stringify(nodos, null, 2), { flag: "a+" });
                            setTimeout(function () {
                                resolve({
                                    message: "Se ha guardado un nuevo objeto al sistema de archivos 📨 ",
                                    payload: nodos,
                                });
                            }, 3000);
                        }
                    })]; //end of the promise
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
                        var exist = fs_1.default.existsSync(headerPath + "/" + _this.fileJsonName.split(".")[0] + "Header.js");
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
                        if (exist) {
                            console.log("no existe vamos a grabarlo ✋");
                            fs_1.default.writeFileSync(headerPath + "/" + _this.fileJsonName.split(".")[0] + "Header.js", JSON.stringify(__assign({}, _this.header, { faceKey: faceKey }), null, 2));
                            setTimeout(function () {
                                resolve({
                                    message: "Se ha creado un header de palabras clave para Caratula 📂",
                                    payload: _this.header,
                                });
                            }, 3500);
                        }
                        else {
                            fs_1.default.writeFileSync(headerPath + "/" + _this.fileJsonName.split(".")[0] + "Header.js", JSON.stringify(__assign({}, _this.header, { faceKey: faceKey }), null, 2));
                            setTimeout(function () {
                                resolve({
                                    message: "Se ha creado un header de palabras clave para Caratula 📂",
                                    payload: _this.header,
                                });
                            }, 3500);
                        }
                    })];
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
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var pice = nodos.slice(0, 10);
                        console.log(pice);
                        pice.forEach(function (item) {
                            var sheet = SingleSheet_1.default.create({
                                item: item
                            });
                        });
                        setTimeout(function () {
                            resolve({ message: "Guardado a la base listo ✅", payload: true });
                        }, 4000);
                    })];
            });
        });
    };
    return FileConverter;
}()); //end of class
exports.FileConverter = FileConverter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNvbnZlcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jYWxsdXAvRmlsZUNvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFFakQsOENBQXdCO0FBQ3hCLHNFQUE0RDtBQUU1RCwwQ0FBK0I7QUFHL0IsSUFBTSxhQUFhLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNsRCxJQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQy9DLElBQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFTL0M7SUFnQkUsdUJBQVksUUFBYTtRQWZ6QixzQkFBaUIsR0FBTyxFQUFFLENBQUM7UUFDM0IsV0FBTSxHQUFTLEVBQUUsQ0FBQztRQUNsQixlQUFlO1FBQ2YsaUJBQVksR0FBVyxFQUFFLENBQUM7UUFDMUIsZUFBVSxHQUFrQyxFQUFFLENBQUM7UUFFL0MsY0FBUyxHQUFjLE1BQU0sQ0FBQztRQUU5QixVQUFLLEdBQU8sRUFBRSxDQUFDO1FBUWIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQVJNLHdCQUFVLEdBQWpCLFVBQWtCLElBQW1DO1FBQ25ELE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUssSUFBcUIsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQU1EOzs7T0FHRztJQUVVLGdDQUFRLEdBQXJCOzs7O2dCQUNFLHNCQUFPLElBQUksT0FBTyxDQUFRLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNuQixJQUFBLDBCQUFJ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