import { Request, Response, NextFunction } from "express-serve-static-core";
import xlsx from "xlsx";
import fileSystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";
const directoryPath: string = path.join(__dirname, "./uploads");
const directoryOut: string = path.join(__dirname, "outputs");
const transformedJson: string = path.join(__dirname, "transformed");
type UploadedFile = fileUpload.UploadedFile;

/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
 */
export class Converter {
  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }
  static guardaArchivo(xfileName: string) {
    console.log(xfileName, "en guardaArchivo");
    return new Promise((resolve, reject) => {
      let leidoexcel = xlsx.readFile(`${directoryPath}\\${xfileName}`, {
        cellDates: true
      });
      let tabs: string[] = leidoexcel.SheetNames;
      function constructWorkSheet(tabs: string[]) {
        tabs.forEach(item => {
          let worksheet = leidoexcel.Sheets[item];
          let data = xlsx.utils.sheet_to_json(worksheet);
          writeJsonToFolder(data, item);
        });
      }
      function writeJsonToFolder(file: object, name: string) {
        fileSystem.writeFileSync(
          `${directoryOut}\\output_${name}.json`,
          JSON.stringify(file, null, 2)
        );
      }
      constructWorkSheet(tabs);
    });
  }
  // static transFile() {}
  constructor() {}

  public convert(req: Request, res: Response, next: NextFunction) {
    if (typeof req.files === "object") {
      let xfile = req.files.file;
      console.log(xfile, "in convert method");
      res.status(201).json({ message: "completado" });
      next();
      if (Converter.isUploaded(xfile)) {
        console.log(xfile.name);
        xfile.mv(`src\\uploads\\${xfile.name}`, err => {
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
  }
}
