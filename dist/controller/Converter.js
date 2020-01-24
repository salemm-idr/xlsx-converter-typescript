"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var FileCall_1 = require("../callup/FileCall");
var directoryPath = path_1.default.join(__dirname, "./uploads");
var directoryOut = path_1.default.join(__dirname, "outputs");
var transformedJson = path_1.default.join(__dirname, "transformed");
/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
 */
var Converter = /** @class */ (function () {
    // static guardaArchivo(xfileName: string) {
    //   console.log(xfileName, "en guardaArchivo");
    //   return new Promise((resolve, reject) => {
    //     let leidoexcel = xlsx.readFile(`${directoryPath}\\${xfileName}`, {
    //       cellDates: true
    //     });
    //     let tabs: string[] = leidoexcel.SheetNames;
    //     function constructWorkSheet(tabs: string[]) {
    //       tabs.forEach(item => {
    //         let worksheet = leidoexcel.Sheets[item];
    //         let data = xlsx.utils.sheet_to_json(worksheet);
    //         writeJsonToFolder(data, item);
    //       });
    //     }
    //     function writeJsonToFolder(file: object, name: string) {
    //       fileSystem.writeFileSync(
    //         `${directoryOut}\\output_${name}.json`,
    //         JSON.stringify(file, null, 2)
    //       );
    //     }
    //     constructWorkSheet(tabs);
    //   });
    // }
    // static transFile() {}
    function Converter() {
    }
    Converter.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    Converter.prototype.convert = function (req, res, next) {
        if (typeof req.files === "object") {
            var xfile = req.files.file;
            console.log(xfile, "in convert method");
            res.status(201).json({ message: "completado" });
            next();
            if (Converter.isUploaded(xfile)) {
                var fileCall = new FileCall_1.FileCall();
                console.log(xfile.name);
                xfile.mv("src\\uploads\\" + xfile.name, function (err) {
                    if (err) {
                        console.log(err);
                        return res.status(204).json({
                            message: "no se ha podido mover el archivo",
                            error: new Error("File not found")
                        });
                    }
                });
                fileCall.readFilex(xfile.name);
            }
        }
    };
    return Converter;
}());
exports.Converter = Converter;
