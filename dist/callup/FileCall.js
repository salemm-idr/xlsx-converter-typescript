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
            return __generator(this, function (_a) {
                setTimeout(function () { return console.log("constuyendo nuevo json"); }, 200);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        //*version streamer
                        var myReadStream = fs_1.default.createReadStream("src\\outputs\\" + name + ".json");
                        // let myWriteStream = filesystem.createWriteStream(
                        //   `src\\tiras\\${name}.json`
                        // );
                        myReadStream.on("data", function (chunk) {
                            var buf = Buffer.from(chunk, "utf-8");
                            var grabado = JSON.stringify(buf);
                            console.table(grabado.slice(0, 20));
                        });
                        //*version readfile sync
                        /* let data = filesystem.readFileSync(`src\\outputs\\${name}.json`, "utf8");
                        let grabado = JSON.parse(data);
                        //console.log(grabado.slice(0, 20));
                  
                        let dataWorked: any = [];
                        grabado.forEach((element: any, index: number) => {
                          const texted: any = element.map((innerText: string) => {
                            if (typeof innerText === "string") {
                              let recortado = innerText
                                .toUpperCase()
                                .trim()
                                .replace(/t\r\n\s+/g, "");
                              return recortado;
                            }
                          });
                          if (texted.includes("TELEFONO") === true) {
                            this.constructedSearch = texted;
                            dataWorked = grabado.slice(index + 1);
                            //return setTimeout(() => resolve(dataWorked), 600);
                            return dataWorked;
                          }
                        });*/
                        //resolve(dataWorked);
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
                        //const readJson = await this.readJsonFromFolder(writeJson);
                        //const newTable = await this.constructNewJson(writeJson);
                        //const newObject = await this.composeNewObject(newTable);
                        //const newExcel = await this.writeNewExcel();
                        return [2 /*return*/, [filex, constructedWorkSheet, writeJson]];
                }
            });
        });
    };
    return FileCall;
}());
exports.FileCall = FileCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBaUQ7QUFDakQsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUl4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUsxRDtJQVNFO1FBUkEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO0lBUVosQ0FBQztJQU5ULG1CQUFVLEdBQWpCLFVBQWtCLElBQW1DO1FBQ25ELE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUssSUFBcUIsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUlZLDJCQUFRLEdBQXJCLFVBQXNCLEtBQW1COzs7Z0JBQ3ZDLHNCQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEvQixDQUErQixFQUFFLEdBQUcsQ0FBQyxDQUFDO3dCQUN2RCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTs0QkFDN0IsSUFBSSxPQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzs0QkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLENBQUMsQ0FBQzs0QkFDbkIsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLE9BQUssQ0FBQyxFQUFFO2dDQUM5QixPQUFLLENBQUMsRUFBRSxDQUFJLGFBQWEsVUFBSyxPQUFLLENBQUMsSUFBTSxFQUFFLFVBQUEsR0FBRztvQ0FDN0MsSUFBSSxHQUFHLEVBQUU7d0NBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3Q0FDakIs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