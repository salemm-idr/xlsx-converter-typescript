import xlsx, { WorkSheet, WorkBook, readFile } from "xlsx";
import filesystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";

type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.join(__dirname, "..\\uploads");

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
    try {
      return new Promise<WorkBook>((resolve, reject) => {
        console.log(xfileName, "en readfilex   🔧");
        let workbook: WorkBook = xlsx.readFile(
          `${directoryPath}\\${xfileName}`
          // {
          //   cellDates: true
          // }
        );
        if (workbook === undefined) {
          reject(new Error("no pueod leer el archivo"));
        } else resolve(workbook);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public constructWorkSheet(workbook: WorkBook) {
    return new Promise<WorkSheet>((resolve, reject) => {
      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");

      tabs.forEach((tab, index) => {
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        let data = xlsx.utils.sheet_to_json(worksheet, {
          header: 1
        });
        this.writeJsonToFolder(data, tab).then(grabado => {
          this.constructNewJson(grabado); //*respuesta de la promesa de escribir el json
        });

        // return worksheet;
      });
      resolve();
    });
  }

  public writeJsonToFolder(data: object, name: string) {
    return new Promise<object>((resolve, reject) => {
      filesystem.writeFileSync(
        `src\\outputs\\${name}.json`,
        JSON.stringify(data, null, 2)
      );
      let grabado = filesystem.readFileSync(
        `src\\outputs\\${name}.json`,
        "utf8"
      );
      let datas = JSON.parse(grabado);
      resolve(datas);
    });
  }

  public constructNewJson(grabado: any) {
    // let constructedSearch: [] = [];
    let dataWorked: [] = [];
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
        //console.log(this.constructedSearch);
        dataWorked = grabado.slice(index + 1);
        this.composeNewObject(dataWorked)
          .then((nodos: any) => {
            console.log(
              "============================ una respuesta ",
              this.writeNewExcel(nodos)
            );
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  public composeNewObject(dataWorked: []) {
    return new Promise<any>((resolve, reject) => {
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
    });
  }
  public writeNewExcel(nodos: any) {
    console.log("nodos en writeexcel ", nodos.slice(0, 10));
    const librito = nodos.slice(0, 30);
    /**crea el libro de trabajo */
    const wb: WorkBook = xlsx.utils.book_new();
    xlsx.writeFile(wb, "maligno.xlsx");
    /**nombre de la hoja string */
    // const ws_name = "tablalocamcoy";
    /**crea la hoja de trabajo */
    //const ws = xlsx.utils.json_to_sheet(librito);
    /**junta el libro creado con la hoja  */
    //xlsx.utils.book_append_sheet(wb, ws, ws_name);
    /**escribe el libro en la ruta especifica */
    //xlsx.write(wb, { bookType: "xlsx", type: "buffer" });
  }
  public async doitAll(name: string) {
    const filex: WorkBook = <WorkBook>await this.readFilex(name);
    const constructedWorkSheet = await this.constructWorkSheet(filex);
  }
}
