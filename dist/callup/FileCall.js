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
var dirOutputs = path_1.default.resolve("src/outputs");
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
                            _this.writeJsonToFolder(toSave);
                            //return toSave;
                            //return data;
                        });
                        resolve(daFile);
                    })];
            });
        });
    };
    FileCall.prototype.writeJsonToFolder = function (wrote) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        console.log(wrote.name, "nombre indefindo");
                        var writeStreamer = fs_1.default.createWriteStream(wrote.name + ".json");
                        writeStreamer.write(JSON.stringify(wrote.hojaAoA, null, 2));
                        // filesystem.writeFileSync(
                        //   `${dirOutputs}/${wrote[0].name}.json`,
                        //   JSON.stringify(wrote[0].hojaAoA, null, 2)
                        // );
                        resolve(wrote.name);
                    })]; //.then(name => this.constructNewJson(name));
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
                        var myReadStream = fs_1.default.createReadStream(dirTiras + "/" + name + ".json");
                        // let myWriteStream = filesystem.createWriteStream(
                        //   `src\\tiras\\${name}.json`
                        // );
                        // myReadStream.on("data", chunk => {
                        //   let buf = Buffer.from(chunk, "utf-8");
                        //   let grabado = JSON.stringify(buf);
                        //   console.table(grabado.slice(0, 20));
                        // });
                        //*version readfile sync
                        var data = fs_1.default.readFileSync(dirTiras + "/" + name + ".json", "utf8");
                        var grabado = JSON.parse(data);
                        //console.log(grabado.slice(0, 20));
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
                        //resolve(dataWorked);
                    }).then(function (dataWorked) { return _this.composeNewObject(dataWorked); })];
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
            var filex, constructedWorkSheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readFilex(name)];
                    case 1:
                        filex = _a.sent();
                        return [4 /*yield*/, this.constructWorkSheet(filex)];
                    case 2:
                        constructedWorkSheet = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUl4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ2xELElBQU0sVUFBVSxHQUFHLGNBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDL0MsSUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMzQyxJQUFNLFlBQVksR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFLeEQ7SUFTRTtRQVJBLHNCQUFpQixHQUFPLEVBQUUsQ0FBQztJQVFaLENBQUM7SUFOVCxtQkFBVSxHQUFqQixVQUFrQixJQUFtQztRQUNuRCxPQUFPLENBQ0wsT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFLLElBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDdEUsQ0FBQztJQUNKLENBQUM7SUFHRiwwQ0FBMEM7SUFDNUIsMkJBQVEsR0FBckIsVUFBc0IsS0FBbUI7OztnQkFDdkMsc0JBQU8sSUFBSSxPQUFPLENBQVMsVUFBQyxPQUFPLEVBQUUsTUFBTTt3QkFDekMsVUFBVSxDQUFDLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLEVBQS9CLENBQStCLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3ZELElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixJQUFJLE9BQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNuQixJQUFJ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