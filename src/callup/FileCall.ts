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

  public async moveFile(xfile: any | object) {
    return new Promise<string>((resolve, reject) => {
      if (typeof xfile === "object") {
        let Xfile = xfile.file;
        console.log(Xfile);
        if (FileCall.isUploaded(Xfile)) {
          Xfile.mv(`${directoryPath}\\${Xfile.name}`, err => {
            if (err) {
              console.log(err);
              reject(new Error("No se ha movido el archivo ⚠️"));
            } else resolve(Xfile.name);
          });
        }
      }
    });
  }

  public readFilex(xfileName: string) {
    try {
      return new Promise((resolve, reject) => {
        console.log(xfileName, "en readfilex   🔧");
        let workbook: WorkBook = xlsx.readFile(
          `${directoryPath}\\${xfileName}`,
          {
            cellDates: true
          }
        );
        console.log("propiedades", workbook.SheetNames);
        resolve(workbook);
        // const { Sheets } = workbook;
        // if (Object.entries(Sheets).length === 0) {
        //   console.log("el objeto viene vacio al leer el archivo");
        //   reject(workbook);
        // } else resolve(workbook);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public constructWorkSheet(workbook: WorkBook) {
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

  public writeJsonToFolder(data: object, name: string) {
    return new Promise((resolve, reject) => {
      filesystem.writeFileSync(
        `src\\outputs\\${name}.json`,
        JSON.stringify(data, null, 2)
      );
    });
  }

  public async doitAll(name: string) {
    console.log(name);
    const filex: WorkBook = <WorkBook>await this.readFilex(name);
    const contructedWorkSheet = await this.constructWorkSheet(filex);
  }
}
