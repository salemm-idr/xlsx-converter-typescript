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
/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
 */
var Converter = /** @class */ (function () {
    function Converter() {
    }
    Converter.prototype.convert = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var xfile, Xfile, moveFile, readfile, construct, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        xfile = req.files;
                        Xfile = new FileConverter_1.FileConverter(xfile);
                        return [4 /*yield*/, Xfile.moveFile()];
                    case 1:
                        moveFile = _a.sent();
                        return [4 /*yield*/, Xfile.readFilex(moveFile)];
                    case 2:
                        readfile = _a.sent();
                        return [4 /*yield*/, Xfile.constructWorkSheet(readfile)];
                    case 3:
                        construct = _a.sent();
                        return [4 /*yield*/, Xfile.jsonTreatment(construct)];
                    case 4:
                        _a.sent();
                        // const composeObj    = await Xfile.composeObject(jsontreatmen)
                        // const createHeader  = await Xfile.createHeader()
                        /*  .then(resp => res.status(200).json({message:"converter!! 😱"}))
                         .catch(error => console.error(error))  */
                        //Promise.all([mov]).then(res => console.log("Todo ha terminado"))
                        //await  Xfile.moveFile(xfile)
                        /* .then(resp => res.status(200).json({message:"Se ha creado un json con la informacion y  construido un header 🐴 ", info:resp}))
                        .catch(err => res.status(400).json({message:`algo ha salido mal${err}`})) */
                        /*  .then((xfileName:any) => {
                           Xfile.doitAll(xfileName)
                           .then( reson => res.status(200).json({reson}))
                           .catch(err => console.log(err))
                         }) */
                        Promise.all([
                            moveFile,
                            readfile,
                            construct,
                        ]).then(function (_a) {
                            var moveFile = _a[0], readfile = _a[1], construct = _a[2];
                            return res.status(200).json({
                                moveFile: moveFile,
                                readfile: readfile,
                                construct: construct,
                            });
                        })
                            .catch(function (error) { return res.status(400).json({ message: "Un error en las acciones no ha dejado continuar " + error }); });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        res.status(400).json({ message: "Error moviendo el archivo ❌", error: error_1 });
                        console.log("Error al mover el archivo \u274C " + error_1);
                        throw new Error("Error al mover el archivo \u274C " + error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Converter;
}());
exports.Converter = Converter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyb2xsZXIvY29udmVydGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSx5REFBd0Q7QUFLeEQ7OztHQUdHO0FBRUg7SUFDRTtJQUFlLENBQUM7SUFDSCwyQkFBTyxHQUFwQixVQUFxQixHQUFZLEVBQUUsR0FBYTs7Ozs7Ozt3QkFFdEMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7d0JBQ2xCLEtBQUssR0FBRyxJQUFJLDZCQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ2hCLHFCQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBQTs7d0JBQXRDLFFBQVEsR0FBUSxTQUFzQjt3QkFDdEIscUJBQU0sS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBQTs7d0JBQS9DLFFBQVEsR0FBUSxTQUErQjt3QkFDL0IscUJBQU0sS0FBSyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFBOzt3QkFBeEQsU0FBUyxHQUFPLFNBQXdDO3dCQUN4QyxxQkFBTSxLQUFLLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxFQUFBOzt3QkFBcEMsU0FBb0MsQ0FBQzt3QkFDNUQsZ0VBQWdFO3dCQUNoRSxtREFBbUQ7d0JBQ3BEO2tFQUMwQzt3QkFDeEMsa0VBQWtFO3dCQUNsRSw4QkFBOEI7d0JBQzlCO29HQUM0RTt3QkFDN0U7Ozs7OEJBSU07d0JBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQzs0QkFDVixRQUFROzRCQUNSLFFBQVE7NEJBQ1IsU0FBUzt5QkFHVixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsRUFLTjtnQ0FKRCxnQkFBUSxFQUNSLGdCQUFRLEVBQ1IsaUJBQVM7NEJBRUgsT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQ0FDekIsUUFBUSxVQUFBO2dDQUNSLFFBQVEsVUFBQTtnQ0FDUixTQUFTLFdBQUE7NkJBR1YsQ0FBQzt3QkFOSSxDQU1KLENBQUM7NkJBQ0YsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBQyxPQUFPLEVBQUMscURBQW1ELEtBQU8sRUFBQyxDQUFDLEVBQTFGLENBQTBGLENBQUMsQ0FBQTs7Ozt3QkFFN0csR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsS0FBSyxTQUFBLEVBQUUsQ0FBQyxDQUFDO3dCQUN4RSxPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUErQixPQUFPLENBQUMsQ0FBQTt3QkFDbkQsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBK0IsT0FBTyxDQUFDLENBQUE7Ozs7O0tBRTFEO0lBVUgsZ0JBQUM7QUFBRCxDQUFDLEFBekRELElBeURDO0FBekRZLDhCQUFTIn0=