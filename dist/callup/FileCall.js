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
                        resolve(daFile);
                    })];
            });
        });
    };
    FileCall.prototype.writeJsonToFolder = function (wrote) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("Escribiendo nuevo AoA 🖨"); }, 200);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        // let writeStreamer = filesystem.createWriteStream(
                        //   `src\\outputs\\${wrote[0].name}.json`
                        // );
                        fs_1.default.writeFileSync("src\\outputs\\" + wrote[0].name + ".json", JSON.stringify(wrote[0].hojaAoA, null, 2));
                        resolve(wrote[0].name);
                    }).then(function (name) { return _this.constructNewJson(name); })];
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
                        //   `src\\outputs\\${name}.json`
                        // );
                        // let myWriteStream = filesystem.createWriteStream(
                        //   `src\\tiras\\${name}.json`
                        // );
                        // myReadStream.on("data", chunk => {
                        //   console.log(myReadStream);
                        //   //myWriteStream.write(chunk);
                        // });
                        //*version readfile sync
                        var data = fs_1.default.readFileSync("src\\outputs\\" + name + ".json", "utf8");
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
                        resolve(dataWorked);
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
                        var myWriteStream = fs_1.default.createWriteStream("src\\tiras\\streamXXX.json");
                        myWriteStream.write(JSON.stringify(nodos, null, 2));
                        //*writeSync version
                        // filesystem.writeFileSync(
                        //   `src\\tiras\\EXITO2callBack.json`,
                        //   JSON.stringify(nodos, null, 2)
                        // );
                        console.log("grabando nuevo JSON ✍️");
                        resolve();
                    }).then(function () { return _this.writeNewExcel(); })];
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
                            console.log(chunk);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUl4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUsxRDtJQVNFO1FBUkEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO0lBUVosQ0FBQztJQU5ULG1CQUFVLEdBQWpCLFVBQWtCLElBQW1DO1FBQ25ELE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUssSUFBcUIsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUlZLDJCQUFRLEdBQXJCLFVBQXNCLEtBQW1COzs7Z0JBQ3ZDLHNCQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEvQixDQUErQixFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTs0QkFDN0IsSUFBSSxPQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQUssQ0FBQyxFQUFFO2dDQUM5QixPQUFLLENBQUMsRUFBRSxDQUFJLGFBQWEsVUFBSyxPQUFLLENBQUMsSUFBTSxFQUFFLFVBQUEsR0FBRztvQ0FDN0MsSUFBSSxHQUFHLEVBQUU7d0NBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3Q0FDakIs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