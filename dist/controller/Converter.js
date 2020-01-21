"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var directoryPath = path_1.default.join(__dirname, "./uploads");
var directoryOut = path_1.default.join(__dirname, "outputs");
var transformedJson = path_1.default.join(__dirname, "transformed");
/**
 * *realize all the engine of endpoint  with the information
 */
var Converter = /** @class */ (function () {
    /**
     *
     * @param req file uploader bring xlsx file to transform
     * @param res  response with status of file tranform and probably seto to data base
     */
    function Converter() {
    }
    Converter.prototype.isUploaded = function (file) {
        return (typeof file === "object" && file.name !== undefined);
    };
    Converter.prototype.convert = function (req, res) {
        console.log("you made it !! and no change at all ");
        try {
            if (typeof req.files === "object") {
                var xfile = req.files.file;
                console.log(xfile);
                // if (this.isUploaded(xfile)) {
                //   console.log(xfile.name);
                //   xfile.mv(`src\\uploads\\${xfile.name}`, err => {
                //     if (err) {
                //       console.log("some error on the file");
                //     }
                //   });
                // }
            }
        }
        catch (error) { }
    };
    return Converter;
}());
exports.Converter = Converter;
