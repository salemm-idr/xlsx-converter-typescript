import xlsx, { WorkSheet, WorkBook, readFile } from "xlsx";
import filesystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";
type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.join(__dirname, "..\\uploads");

export class FileCall {
  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }
  constructor() {}

  static moveFile(xfile: any | object) {
    return new Promise<string>((resolve, reject) => {
      if (typeof xfile === "object") {
        const Xfile = xfile.file;
        console.log(Xfile);
        if (FileCall.isUploaded(Xfile)) {
          Xfile.mv(`${directoryPath}\\${Xfile.name}`, err => {
            if (err) {
              console.log(err);
              reject(new Error("No se ha movido el archivo ⚠️"));
            }
          });
          resolve(Xfile.name);
        }
      }
    });
  }

  static readFilex(xfileName: string) {
    return new Promise((resolve, reject) => {
      console.log(xfileName, "en readfilex 🔧");
      let workbook = readFile(`${directoryPath}\\${xfileName}`);
      resolve(workbook);
    });
  }

  static constructWorkSheet(workbook: WorkBook) {
    return new Promise<WorkSheet>((resolve, reject) => {
      const tabs: string[] = workbook.SheetNames;
      console.log(tabs, "in filecall 👌");
      tabs.forEach(tab => {
        let worksheet: WorkSheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        let data = xlsx.utils.sheet_to_json(worksheet);
        this.writeJsonToFolder(data, tab);
      });
    });
  }

  static writeJsonToFolder(data: object, name: string) {
    return new Promise((resolve, reject) => {
      filesystem.writeFileSync(
        `src\\outputs\\${name}.json`,
        JSON.stringify(data, null, 2)
      );
    });
  }
}
