import xlsx, { WorkSheet } from "xlsx";
import path from "path";
const directoryPath: string = path.join(__dirname, "src/uploads");
export class FileCall {
  constructor() {}

  readFilex(xfileName: string) {
    return new Promise((resolve, reject) => {
      const leidoexcel = xlsx.readFile(`src\\uploads\\${xfileName}`, {
        cellDates: true
      });
      //   resolve(leidoexcel);
      //   console.log(typeof leidoexcel, "lo lograste maldito hijo de perra");
      if (leidoexcel) {
        resolve(leidoexcel);
        this.constructWorkSheet(leidoexcel);
      } else if (!leidoexcel) {
        reject(new Error("no se ha podido leer el archivo"));
      }
    });
  }
  constructWorkSheet(filex: WorkSheet) {
    console.log(filex, "en filecall");
    let tabs: [] = filex.SheetNames;
    tabs.forEach((element: string) => {
      console.log(element);
    });
  }
}
