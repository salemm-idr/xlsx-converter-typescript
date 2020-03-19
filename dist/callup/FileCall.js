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
var directoryPath = path_1.default.resolve("src/uploads");
var dirOutputs = path_1.default.resolve("src/arrayof");
var dirTiras = path_1.default.resolve("src/tiras");
var dirConstruct = path_1.default.resolve("src/constructedFile");
var FileCall = /** @class */ (function () {
    function FileCall() {
        this.constructedSearch = [];
    }
    FileCall.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    //* mover el arhivo que viene de navegador
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
    //* leer archivo despues de movido
    FileCall.prototype.readFilex = function (xfileName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("leyendo el  archivo ✊"); }, 200);
                        console.log(xfileName, "en readfilex   🔧");
                        var workbook = xlsx_1.default.readFile(directoryPath + "/" + xfileName, {
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
    //* construye un workseeht de la lectura a AoA(arreglo de arreglos)
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
                            //this.constructNewJson(data);
                            // let stream = xlsx.stream.to_json(worksheet, { raw: true });
                            // var conv = new Transform({ writableObjectMode: true });
                            // conv._transform = function(obj, e, cb) {
                            //   cb(null, JSON.stringify(obj, null, 2));
                            // };
                            // let myWriteStream = filesystem.createWriteStream(
                            //   "src\\tiras\\stream.json"
                            // );
                            // stream.pipe(conv);
                            // conv.pipe(myWriteStream);
                            toSave.name = tab;
                            toSave.hojaAoA = data;
                            //this.writeJsonToFolder(toSave);
                            return toSave;
                            //return data;
                        });
                        setTimeout(function () {
                            console.log("termina de construir worksheet ⏬");
                            resolve(daFile.shift());
                        }, 2800);
                    })];
            });
        });
    };
    FileCall.prototype.writeJsonToFolder = function (wrote) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        //console.log(wrote,"nombre indefindo")
                        var writeStreamer = fs_1.default.createWriteStream(dirOutputs + "/" + wrote.name + ".txt");
                        writeStreamer.write(JSON.stringify(wrote.hojaAoA, null, 2));
                        //!problema es la extension no la ruta
                        //todo manejar el aoa sin guardarlo y enviar a manejo por separado
                        // filesystem.writeFileSync(
                        //   `${dirOutputs}/${wrote.name}.json`,
                        //   JSON.stringify(wrote.hojaAoA, null, 2)
                        // );
                        //!esto esta ingresado a prueba
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
                                //return setTimeout(() => resolve(dataWorked), 600);
                                return dataWorked;
                            }
                        });
                        //!fin de preba
                        resolve(dataWorked);
                    }).then(function (dataWorked) { return _this.composeNewObject(dataWorked); })];
            });
        });
    };
    FileCall.prototype.constructNewJson = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("constuyendo nuevo json"); }, 200);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        //*version streamer
                        // let myReadStream = filesystem.createReadStream(
                        //   `${dirOutputs}/${name}`
                        // );
                        // let myWriteStream = filesystem.createWriteStream(
                        //   `src\\tiras\\${name}.json`
                        // );
                        // myReadStream.on("data", chunk => {
                        //   let buf = Buffer.from(chunk, "utf-8");
                        //   let grabado = JSON.stringify(buf);
                        //   console.table(grabado.slice(0, 20));
                        // });
                        //*version readfile sync
                        var data = fs_1.default.readFileSync(dirOutputs + "/" + name + ".txt", "utf8");
                        var grabado = JSON.parse(data);
                        console.log(grabado);
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
                    })]; //.then(dataWorked => this.composeNewObject(dataWorked));
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
                        //*stream version
                        // let myReadStream = filesystem.createReadStream(
                        //   `src\\outputs\\${name}.json`
                        // );
                        var myWriteStream = fs_1.default.createWriteStream(dirTiras + "/streamXXX.json");
                        myWriteStream.write(JSON.stringify(nodos, null, 2));
                        //*writeSync version
                        // filesystem.writeFileSync(
                        //   `src\\tiras\\EXITO2callBack.json`,
                        //   JSON.stringify(nodos, null, 2)
                        // );
                        console.log("grabando nuevo JSON ✍️");
                        resolve();
                    })]; //.then(() => this.writeNewExcel());
            });
        });
    };
    FileCall.prototype.writeNewExcel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        setTimeout(function () { return console.log("Escribe nuevo excel 👷"); }, 200);
                        var myReadStream = fs_1.default.createReadStream("src\\tiras\\streamXXX.json");
                        var myWriteStream = fs_1.default.createWriteStream("src\\constructedFile\\streamExcel.xlsx");
                        myReadStream.on("data", function (chunk) {
                            console.log("si esta trabajando el streamer read");
                        });
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
                    })]; //.then(res => console.log("Todo se ha guarado con exito 🙉 🙈 🙊"));
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
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUl4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xELElBQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDL0MsSUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzQyxJQUFNLFlBQVksR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFLeEQ7SUFTRTtRQVJBLHNCQUFpQixHQUFPLEVBQUUsQ0FBQztJQVFaLENBQUM7SUFOVCxtQkFBVSxHQUFqQixVQUFrQixJQUFtQztRQUNuRCxPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFLLElBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFHRiwwQ0FBMEM7SUFDNUIsMkJBQVEsR0FBckIsVUFBc0IsS0FBbUI7OztnQkFDdkMsc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDekMsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQS9CLENBQStCLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3ZELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixJQUFJLE9BQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNuQixJQUFJ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