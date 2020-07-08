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
Object.defineProperty(exports, "__esModule", { value: true });
var FileConverter_1 = require("../callup/FileConverter");
var fetch = require('node-fetch');
/**
 * *realize all the engine of endpoint  with the information
 * @class FileConverter extract xlsx info and construct s json with information
 * @class Converter call class File converter and take node request
 * @public convert make the calls over @function and wait for the result to go on to the next one
 */
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.prototype.convert = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseFunction;
            var _this = this;
            return __generator(this, function (_a) {
                promiseFunction = function () { return __awaiter(_this, void 0, void 0, function () {
                    var xfile, Xfile, moveFile, readfile, construct, nodos, compose, jsonHeader, toDb, allPromises;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                xfile = req.files;
                                Xfile = new FileConverter_1.FileConverter(xfile);
                                return [4 /*yield*/, Xfile.moveFile()];
                            case 1:
                                moveFile = _a.sent();
                                return [4 /*yield*/, Xfile.readFilex(moveFile.payload)];
                            case 2:
                                readfile = _a.sent();
                                return [4 /*yield*/, Xfile.constructWorkSheet(readfile.payload)];
                            case 3:
                                construct = _a.sent();
                                return [4 /*yield*/, Xfile.jsonTreatment(construct.payload)];
                            case 4:
                                nodos = _a.sent();
                                return [4 /*yield*/, Xfile.composeObject(nodos.payload)];
                            case 5:
                                compose = _a.sent();
                                return [4 /*yield*/, Xfile.createHeader()];
                            case 6:
                                jsonHeader = _a.sent();
                                return [4 /*yield*/, Xfile.writeTodb(compose.payload)];
                            case 7:
                                toDb = _a.sent();
                                try {
                                    allPromises = Promise.all([moveFile, readfile, construct, nodos, compose, jsonHeader])
                                        .then(function (responses) { return responses.forEach(function (response) { return console.log(response.message); }); })
                                        .then(function () { return res.status(200).json({ message: "all it\u015B being set \uD83D\uDC4C" }); })
                                        .catch(function (error) { return console.log(error, "Una de las promesas ha fallado ❌"); });
                                    console.log("corre la promesas all!! 💀", allPromises);
                                }
                                catch (error) {
                                    res.status(400).json({ message: "Error moviendo el archivo ❌", error: error });
                                    console.log("Error al mover el archivo \u274C " + error);
                                    throw new Error("Error al mover el archivo \u274C " + error);
                                }
                                return [2 /*return*/];
                        }
                    });
                }); };
                promiseFunction();
                return [2 /*return*/];
            });
        });
    };
    return Converter;
}());
exports.Converter = Converter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBd0Q7QUFDeEQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDOzs7OztHQUtHO0FBRUg7SUFDRTtJQUFlLENBQUM7SUFFSCwyQkFBTyxHQUFwQixVQUFxQixHQUFZLEVBQUUsR0FBYTs7Ozs7Z0JBQ3hDLGVBQWUsR0FBRzs7Ozs7Z0NBQ2xCLEtBQUssR0FBUSxHQUFHLENBQUMsS0FBSyxDQUFDO2dDQUN2QixLQUFLLEdBQVEsSUFBSSw2QkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dDQUN6QixxQkFBTSxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUE7O2dDQUFuQyxRQUFRLEdBQUssU0FBc0I7Z0NBQ3RCLHFCQUFNLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztnQ0FBcEQsUUFBUSxHQUFLLFNBQXVDO2dDQUN2QyxxQkFBTSxLQUFLLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFBOztnQ0FBN0QsU0FBUyxHQUFJLFNBQWdEO2dDQUNoRCxxQkFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBQTs7Z0NBQXpELEtBQUssR0FBUSxTQUE0QztnQ0FDNUMscUJBQU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUE7O2dDQUFyRCxPQUFPLEdBQU0sU0FBd0M7Z0NBQ3hDLHFCQUFNLEtBQUssQ0FBQyxZQUFZLEVBQUUsRUFBQTs7Z0NBQXZDLFVBQVUsR0FBRyxTQUEwQjtnQ0FDMUIscUJBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUE7O2dDQUFuRCxJQUFJLEdBQVMsU0FBc0M7Z0NBQ3ZELElBQUk7b0NBQ0ssV0FBVyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLFVBQVUsQ0FBQyxDQUFDO3lDQUN0RixJQUFJLENBQUMsVUFBQyxTQUFTLElBQUksT0FBQSxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQTdCLENBQTZCLENBQUMsRUFBOUQsQ0FBOEQsQ0FBQzt5Q0FDbEYsSUFBSSxDQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBQyxxQ0FBc0IsRUFBQyxDQUFDLEVBQXRELENBQXNELENBQUM7eUNBQ2xFLEtBQUssQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLGtDQUFrQyxDQUFDLEVBQXJELENBQXFELENBQUMsQ0FBQTtvQ0FDdEUsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxXQUFXLENBQUMsQ0FBQTtpQ0FDeEQ7Z0NBQUMsT0FBTyxLQUFLLEVBQUU7b0NBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsS0FBSyxPQUFBLEVBQUUsQ0FBQyxDQUFDO29DQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUErQixLQUFPLENBQUMsQ0FBQztvQ0FDcEQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBK0IsS0FBTyxDQUFDLENBQUM7aUNBQ3pEOzs7O3FCQUNGLENBQUE7Z0JBQ0YsZUFBZSxFQUFFLENBQUE7Ozs7S0FDakI7SUFDSCxnQkFBQztBQUFELENBQUMsQUE1QkQsSUE0QkM7QUE1QlksOEJBQVMifQ==