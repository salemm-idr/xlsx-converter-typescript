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
                try {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            console.log(xfileName, "en readfilex   🔧");
                            var workbook = xlsx_1.default.readFile(directoryPath + "\\" + xfileName
                            // {
                            //   cellDates: true
                            // }
                            );
                            if (workbook === undefined) {
                                reject(new Error("no pueod leer el archivo"));
                            }
                            else
                                resolve(workbook);
                        })];
                }
                catch (error) {
                    console.log(error);
                }
                return [2 /*return*/];
            });
        });
    };
    FileCall.prototype.constructWorkSheet = function (workbook) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var tabs = workbook.SheetNames;
            var worksheet;
            console.log(tabs, "in filecall 👌");
            tabs.forEach(function (tab, index) {
                worksheet = workbook.Sheets[tab];
                console.log(tab, "nombre de la tabla individual 🚀");
                var data = xlsx_1.default.utils.sheet_to_json(worksheet, {
                    header: 1
                });
                _this.writeJsonToFolder(data, tab).then(function (grabado) {
                    _this.constructNewJson(grabado); //*respuesta de la promesa de escribir el json
                });
                // return worksheet;
            });
            resolve();
        });
    };
    FileCall.prototype.writeJsonToFolder = function (data, name) {
        return new Promise(function (resolve, reject) {
            fs_1.default.writeFileSync("src\\outputs\\" + name + ".json", JSON.stringify(data, null, 2));
            var grabado = fs_1.default.readFileSync("src\\outputs\\" + name + ".json", "utf8");
            var datas = JSON.parse(grabado);
            resolve(datas);
        });
    };
    FileCall.prototype.constructNewJson = function (grabado) {
        var _this = this;
        // let constructedSearch: [] = [];
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
                //console.log(this.constructedSearch);
                dataWorked = grabado.slice(index + 1);
                _this.composeNewObject(dataWorked)
                    .then(function (nodos) {
                    console.log("============================ una respuesta ", _this.writeNewExcel(nodos));
                })
                    .catch(function (error) {
                    console.log(error);
                });
            }
        });
    };
    FileCall.prototype.composeNewObject = function (dataWorked) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var nodos = dataWorked.map(function (nodo) {
                var xFile = {};
                nodo.forEach(function (elemento, index) {
                    xFile[_this.constructedSearch[index]] = elemento;
                });
                return xFile;
            });
            fs_1.default.writeFileSync("src\\tiras\\EXITO2callBack.json", JSON.stringify(nodos, null, 2));
            console.log("grabando nuevo JSON ✍️");
            resolve(nodos);
        });
    };
    FileCall.prototype.writeNewExcel = function (nodos) {
        console.log("nodos en writeexcel ", nodos.slice(0, 10));
        // let lecturaFile = filesystem.readFileSync(
        //   "src\\tiras\\EXITO2callBack.json",
        //   "utf8"
        // );
        // let data = JSON.parse(lecturaFile);
        // console.log(data.slice(0, 20), "estas en write indicado ");
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZUNhbGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsbHVwL0ZpbGVDYWxsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBMkQ7QUFDM0QsMENBQTRCO0FBRTVCLDhDQUF3QjtBQUd4QixJQUFNLGFBQWEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUUxRDtJQVNFO1FBUkEsc0JBQWlCLEdBQU8sRUFBRSxDQUFDO0lBUVosQ0FBQztJQU5ULG1CQUFVLEdBQWpCLFVBQWtCLElBQW1DO1FBQ25ELE9BQU8sQ0FDTCxPQUFPLElBQUksS0FBSyxRQUFRLElBQUssSUFBcUIsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUN0RSxDQUFDO0lBQ0osQ0FBQztJQUlZLDJCQUFRLEdBQXJCLFVBQXNCLEtBQW1COzs7Z0JBQ3ZDLHNCQUFPLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU07d0JBQ3pDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFOzRCQUM3QixJQUFJLE9BQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDOzRCQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssQ0FBQyxDQUFDOzRCQUNuQixJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBSyxDQUFDLEVBQUU7Z0NBQzlCLE9BQUssQ0FBQyxFQUFFLENBQUksYUFBYSxVQUFLLE9BQUssQ0FBQyxJQUFNLEVBQUUsVUFBQSxHQUFHO29DQUM3QyxJQUFJLEdBQUcsRUFBRTt3Q0FDUCxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dDQUNqQixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQyxDQUFDO3FDQUNwRDs7d0NBQU0sT0FBTyxDQUFDLE9BQUssQ0FBQyxJQUFJLENBQUMs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