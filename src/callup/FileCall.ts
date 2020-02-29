import xlsx, { WorkSheet, WorkBook } from "xlsx";
import filesystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";
import { Writable, WritableOptions } from "stream";

type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.join(__dirname, "..\\uploads");
interface toWrite {
  name: string;
  hojaAoA: unknown[];
}
export class FileCall {
  constructedSearch: [] = [];

  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }

  constructor() {}

  public async moveFile(xfile: any | object) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => console.log("moviendo archivo"), 200);
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

  public async readFilex(xfileName: string) {
    return new Promise<WorkBook>((resolve, reject) => {
      setTimeout(() => console.log("leyendo el  archivo ✊"), 200);

      console.log(xfileName, "en readfilex   🔧");
      let workbook: WorkBook = xlsx.readFile(`${directoryPath}\\${xfileName}`, {
        cellDates: true
      });
      if (workbook === undefined) {
        reject(new Error("no pueod leer el archivo"));
      } else resolve(workbook);
    });
  }

  public async constructWorkSheet(workbook: WorkBook) {
    return new Promise<object>((resolve, reject) => {
      setTimeout(() => console.log("construyendo sheet 🕵"), 200);

      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");

      let daFile = tabs.map((tab, index) => {
        let toSave = {} as toWrite;
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        let data = xlsx.utils.sheet_to_json(worksheet, {
          header: 1
        });
        // let data = xlsx.stream.to_json(worksheet, { header: 1 });
        toSave.name = tab;
        toSave.hojaAoA = data;
        return toSave;
      });
      resolve(daFile);
    });
  }

  public async writeJsonToFolder(wrote: any) {
    return new Promise<object>((resolve, reject) => {
      setTimeout(() => console.log("Escribiendo nuevo AoA 🖨"), 200);

      filesystem.writeFileSync(
        `src\\outputs\\${wrote[0].name}.json`,
        JSON.stringify(wrote[0].hojaAoA, null, 2)
      );
      let grabado = filesystem.readFileSync(
        `src\\outputs\\${wrote[0].name}.json`,
        "utf8"
      );
      let datas = JSON.parse(grabado);
      console.log("largo de datas", datas.length);
      //setTimeout(() => resolve(datas), 500);
      resolve(datas);
    });
  }

  public async constructNewJson(grabado: any) {
    setTimeout(() => console.log("Refactorizando json 🔧"), 200);

    return new Promise<ArrayBuffer>((resolve, reject) => {
      let dataWorked: any = [];
      grabado.forEach((element: [], index: number) => {
        const texted: any = element.map((innerText: string) => {
          if (typeof innerText === "string") {
            let recortado = innerText
              .toUpperCase()
              .trim()
              .replace(/t\r\n\s+/g, "");
            return recortado;
          }
        });
        if (texted.includes("TELEFONO") === true) {
          this.constructedSearch = texted;
          dataWorked = grabado.slice(index + 1);
          //return setTimeout(() => resolve(dataWorked), 600);
          return dataWorked;
        }
      });
      resolve(dataWorked);
    });
  }

  public async composeNewObject(dataWorked: any) {
    setTimeout(() => console.log("Armando json de escritura 🚧"), 200);

    return new Promise<object>((resolve, reject) => {
      let nodos: any[] = dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
      filesystem.writeFileSync(
        `src\\tiras\\EXITO2callBack.json`,
        JSON.stringify(nodos, null, 2)
      );

      console.log("grabando nuevo JSON ✍️");
      resolve(nodos);
    }).then(() => this.writeNewExcel());
  }
  public async writeNewExcel() {
    console.log("writefile entrance");
    return new Promise((resolve, reject) => {
      setTimeout(() => console.log("Escribe nuevo excel 👷"), 200);

      /**crea el libro de trabajo */
      const wb: WorkBook = xlsx.utils.book_new();
      /**nombre de la hoja string */
      const ws_name = "transformed";
      /**crea la hoja de trabajo */
      //let ws: WorkSheet = xlsx.stream.to_json(nodos);
      //*version streamer
      /**junta el libro creado con la hoja  */
      // xlsx.utils.book_append_sheet(wb, ws, ws_name);
      /**escribe el libro en la ruta especifica */
      //xlsx.writeFile(wb, "src\\constructedFile\\streamer.xlsx");

      resolve(wb);
    }); //.then(res => console.log("Todo se ha guarado con exito 🙉 🙈 🙊"));
  }
  public async doitAll(name: string) {
    const filex: WorkBook = <WorkBook>await this.readFilex(name);
    const constructedWorkSheet: object = await this.constructWorkSheet(filex);
    const writeJson = await this.writeJsonToFolder(constructedWorkSheet);
    const newTable = await this.constructNewJson(writeJson);
    const newObject = await this.composeNewObject(newTable);
    //const newExcel = await this.writeNewExcel();
  }
}
