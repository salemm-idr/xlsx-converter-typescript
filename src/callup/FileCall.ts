import xlsx, { WorkSheet, WorkBook } from "xlsx";
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
        xfile = xfile.file;
        if (FileCall.isUploaded(xfile)) {
          xfile.mv(`${directoryPath}\\${xfile.name}`, err => {
            if (err) {
              console.log(err);
              reject(new Error("No se ha movido el archivo"));
            }
          });
          resolve(xfile.name);
        }
      }
    });
  }

  static readFilex(xfileName: string) {
    return new Promise((resolve, reject) => {
      const workbook = xlsx.readFile(`${directoryPath}\\${xfileName}`, {
        cellDates: true,
        type: "array"
      });
      resolve(workbook);
    });
  }

  static constructWorkSheet(workbook: WorkBook) {
    return new Promise<WorkSheet>((resolve, reject) => {
      let tabs: string[] = workbook.SheetNames;
      console.log(tabs, "in filecall");
      tabs.map(tab => {
        let worksheet: WorkSheet = workbook.Sheets[tab];
        const data = xlsx.utils.sheet_to_json(worksheet, { header: tabs });
        const dataRes = { data, name: tab };
        resolve(dataRes);
      });
    });
  }

  static writeJsonToFolder(ws: WorkSheet) {
    return new Promise((resolve, reject) => {
      filesystem.writeFileSync(
        `src\\outputs\\${ws.name}.json`,
        JSON.stringify(ws.data, null, 2)
      );
    });
  }
}
