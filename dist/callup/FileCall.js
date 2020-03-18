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
var directoryArchive = path_1.default.join(__dirname, "..\\tiras");
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
                                        reject(new Error("No se ha movido el archivo 🔽"));
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
                            reject(new Error("no puedo leer el archivo"));
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
                            return data;
                        });
                        setTimeout(function () {
                            console.log("resolviendo json");
                            resolve(daFile[0]); //!por que la respuesta venia con un extra []
                        }, 2000);
                    })]; //.then(value => this.constructNewJson(value));
            });
        });
    };
    FileCall.prototype.constructNewJson = function (grabado) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var dataWorked = [];
                        grabado.forEach(function (element, index) {
                            var texted = element.map(function (innerText) {
                                if (typeof innerText === "string") {
                                    var recortado = innerText
                                        .toString()
                                        .toUpperCase()
                                        .trim()
                                        .replace(/t\r\n\s+/g, "");
                                    return recortado;
                                }
                            });
                            if (texted.includes("TELEFONO") === true) {
                                _this.constructedSearch = texted;
                                dataWorked = grabado.slice(index + 1);
                                return dataWorked;
                            }
                        });
                        setTimeout(function () {
                            console.log("Procesando archivo... ✍️");
                            resolve(dataWorked);
                        }, 2800);
                    })]; //.then(dataWorked => this.composeNewObject(dataWorked));
            });
        });
    };
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
                        /**
                        //crea el libro de trabajo
                        const wb: WorkBook = xlsx.utils.book_new();
                        //nombre de la hoja string
                        const ws_name = "transformed";
                        //crea la hoja de trabajo
                        let ws: WorkSheet = xlsx.utils.json_to_sheet(nodos);
                        //junta el libro creado con la hoja
                        xlsx.utils.book_append_sheet(wb, ws, ws_name);
                        //escribe el libro en la ruta especifica
                        xlsx.writeFile(wb, "src/constructedFile/streamerX4space.xlsx");
                        */
                        setTimeout(function () {
                            console.log("Escribiendo nuevo Json 🚧");
                            resolve(nodos);
                        }, 2600);
                    }).then(function (nodos) {
                        var myWriteStream = fs_1.default.createWriteStream("src/tiras/streamXXX.json");
                        var stremx = JSON.stringify(nodos.slice(0, 100), null, 2);
                        console.log(nodos.slice(0, 5), "en la respuesta ");
                        myWriteStream.write(JSON.stringify(nodos, null, 2), function () { console.log("error al grabar datos"); });
                    })];
            });
        });
    };
    FileCall.prototype.writeNewJson = function (nodos) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // const myWriteStream = filesystem.createWriteStream( `src/tiras/streamXXX.json`
                        // );
                        // let stremx = JSON.stringify(nodos.slice(0,100), null, 2)
                        // console.log(nodos.slice(0,5))
                        // myWriteStream.write(JSON.stringify(nodos, null, 2))
                        fs_1.default.writeFileSync("src//tiras//exito.json", JSON.stringify(nodos, null, 2));
                        resolve();
                    }).then(function (res) { return console.log("Todo se ha guarado con exito 🙉 🙈 🙊"); })];
            });
        });
    };
    //todo Eliminar las conexion de la lectura
    //todo agregar los nuevos paths para la escritura del json
    //todo mejorar la sintaxis de las variables
    //todo intentar escribir despues de eso el excel con el streamer del xlsx
    //todo intentar escribir el excel con el streamer de node
    //todo hacer refactor del codigo y dejaro mas limpio
    //todo comentar las funciones y sintantic
    FileCall.prototype.doitAll = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var filex, constructedWorkSheet, newTable, newObject;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFilex(name)];
                    case 1:
                        filex = _a.sent();
                        return [4 /*yield*/, this.constructWorkSheet(filex)];
                    case 2:
                        constructedWorkSheet = _a.sent();
                        return [4 /*yield*/, this.constructNewJson(constructedWorkSheet)];
                    case 3:
                        newTable = _a.sent();
                        return [4 /*yield*/, this.composeNewObject(newTable)];
                    case 4:
                        newObject = _a.sent();
                        //const writedJson = await this.writeNewJson(newObject)
                        return [2 /*return*/, [filex, constructedWorkSheet, newTable, newObject]];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUd4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUN6RCxJQUFNLGdCQUFnQixHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFDLFdBQVcsQ0FBQyxDQUFBO0FBS3pEO0lBU0U7UUFSQSxzQkFBaUIsR0FBTyxFQUFFLENBQUM7SUFRWixDQUFDO0lBTlQsbUJBQVUsR0FBakIsVUFBa0IsSUFBbUM7UUFDbkQsT0FBTyxDQUNMLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSyxJQUFxQixDQUFDLElBQUksS0FBSyxTQUFTLENBQ3RFLENBQUM7SUFDSixDQUFDO0lBSVksMkJBQVEsR0FBckIsVUFBc0IsS0FBbUI7OztnQkFDdkMsc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDekMsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQS9CLENBQStCLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3ZELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixJQUFJLE9BQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNuQixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBSyxDQUFDLEVBQUU7Z0NBQzlCLE9BQUssQ0FBQyxFQUFFLENBQUksYUFBYSxVQUFLLE9BQUssQ0FBQyxJQUFNLEVBQUUsVUFBQSxHQUFHO29D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