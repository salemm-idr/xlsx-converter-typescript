"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xlsx_1 = __importDefault(require("xlsx"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var directoryPath = path_1.default.join(__dirname, "./uploads");
var directoryOut = path_1.default.join(__dirname, "outputs");
var transformedJson = path_1.default.join(__dirname, "transformed");
/**
 * *realize all the engine of endpoint  with the information
 */
var Converter = /** @class */ (function () {
    // static transFile() {}
    function Converter() {
    }
    Converter.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    Converter.guardaArchivo = function (xfileName) {
        console.log(xfileName, "en guardaArchivo");
        return new Promise(function (resolve, reject) {
            var leidoexcel = xlsx_1.default.readFile(directoryPath + "\\" + xfileName, {
                cellDates: true
            });
            var tabs = leidoexcel.SheetNames;
            function constructWorkSheet(tabs) {
                tabs.forEach(function (item) {
                    var worksheet = leidoexcel.Sheets[item];
                    var data = xlsx_1.default.utils.sheet_to_json(worksheet);
                    writeJsonToFolder(data, item);
                });
            }
            function writeJsonToFolder(file, name) {
                fs_1.default.writeFileSync(directoryOut + "\\output_" + name + ".json", JSON.stringify(file, null, 2));
            }
            constructWorkSheet(tabs);
            resolve(xfileName);
        });
    };
    Converter.prototype.convert = function (req, res, next) {
        if (typeof req.files === "object") {
            var xfile = req.files.file;
            console.log(xfile, "in convert method");
            res.status(201).json({ message: "completado" });
            next();
            if (Converter.isUploaded(xfile)) {
                console.log(xfile.name);
                xfile.mv("src\\uploads\\" + xfile.name, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(204).json({
                            message: "no se ha podido mover el archivo",
                            error: new Error("File not found")
                        });
                    }
                    next();
                });
                Converter.guardaArchivo(xfile.name);
            }
        }
    };
    return Converter;
}());
exports.Converter = Converter;
