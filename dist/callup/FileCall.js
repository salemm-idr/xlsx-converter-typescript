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
                            console.log("Procesando archivo...");
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
                        var myWriteStream = fs_1.default.createWriteStream("src\\tiras\\streamXXX.json");
                        myWriteStream.write(JSON.stringify(nodos, null, 2), function (error) {
                            if (error) {
                                console.log("hay un errr al grabar con stream", error);
                            }
                        });
                        //*stream version
                        var myReadStream = fs_1.default.createReadStream("src\\tiras\\streamXXX.json");
                        var excelWriter = fs_1.default.createWriteStream("src\\constructedFile\\streamXXX.xlsx");
                        var buffers = [];
                        myReadStream.on("data", function (chunk) {
                            console.timeEnd(chunk);
                            buffers.push(chunk);
                            // const wb: WorkBook = xlsx.utils.book_new();
                            // const ws_name = "transformed";
                            // let ws: WorkSheet = xlsx.utils.json_to_sheet(chunk);
                            // xlsx.utils.book_append_sheet(wb, ws, ws_name);
                            // xlsx.writeFile(wb, "src\\constructedFile\\streamer.xlsx");
                        });
                        myReadStream.on("end", function () {
                            var buffer = Buffer.concat(buffers);
                            var workbook = xlsx_1.default.read(buffer, { type: "buffer" });
                            xlsx_1.default.writeFile(workbook, "libro.xlsx");
                        });
                        //*writeSync version
                        // filesystem.writeFileSync(
                        //   `src\\tiras\\EXITO2callBack.json`,
                        //   JSON.stringify(nodos, null, 2)
                        // );
                        // setTimeout(() => {
                        //   console.log(dataChunk, "Escribiendo nuevo Json 🚧");
                        //   resolve(dataChunk);
                        // }, 2600);
                    })]; //.then(() => this.writeNewExcel());
            });
        });
    };
    FileCall.prototype.writeNewExcel = function () {
        return new Promise(function (resolve, reject) {
            console.log("si llegaste a writeexcel");
            // let myReadStream = filesystem.createReadStream(
            //   `src\\tiras\\streamXXX.json`
            // );
            // let myWriteStream = filesystem.createWriteStream(
            //   "src\\constructedFile\\streamExcel.xlsx"
            // );
            // myReadStream.on("data", (chunk: any) => {
            //   console.log(chunk);
            // });
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
            resolve();
        }); //.then(res => console.log("Todo se ha guarado con exito 🙉 🙈 🙊"));
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
            var filex, constructedWorkSheet, newTable, newObject, newExcel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        //!resuelve promesas en serial una seguida de la otra
                        console.time("doitall");
                        return [4 /*yield*/, this.readFilex(name)];
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
                        return [4 /*yield*/, this.writeNewExcel()];
                    case 5:
                        newExcel = _a.sent();
                        console.timeEnd("doitall");
                        return [2 /*return*/, [filex, constructedWorkSheet, newTable, newObject]];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUt4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUsxRDtJQVNFO1FBUkEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO0lBUVosQ0FBQztJQU5ULG1CQUFVLEdBQWpCLFVBQWtCLElBQW1DO1FBQ25ELE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUssSUFBcUIsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUlZLDJCQUFRLEdBQXJCLFVBQXNCLEtBQW1COzs7Z0JBQ3ZDLHNCQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEvQixDQUErQixFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTs0QkFDN0IsSUFBSSxPQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQUssQ0FBQyxFQUFFO2dDQUM5QixPQUFLLENBQUMsRUFBRSxDQUFJLGFBQWEsVUFBSyxPQUFLLENBQUMsSUFBTSxFQUFFLFVBQUEsR0FBRztvQ0FDN0MsSUFBSSxHQUFHLEVBQUU7d0NBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3Q0FDakIs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