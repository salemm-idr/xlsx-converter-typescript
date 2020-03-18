import xlsx, { WorkSheet, WorkBook } from "xlsx";
import filesystem from "fs";
import fileUpload from "express-fileupload";
import path from "path";

type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.join(__dirname,"..\\uploads");
const directoryArchive = path.join(__dirname,"..\\tiras")
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
              reject(new Error("No se ha movido el archivo 🔽"));
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
        reject(new Error("no puedo leer el archivo"));
      } else resolve(workbook);
    });
  }

  public async constructWorkSheet(workbook: WorkBook) {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => console.log("construyendo sheet 🕵"), 200);

      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");

      let daFile: any = tabs.map((tab, index) => {
        let toSave = {} as toWrite;
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        let data = xlsx.utils.sheet_to_json(worksheet, {
          header: 1
        });
        return data;
      });
      setTimeout(() => {
        console.log("resolviendo json");
        resolve(daFile[0]); //!por que la respuesta venia con un extra []
      }, 2000);
    }); //.then(value => this.constructNewJson(value));
  }

  public async constructNewJson(grabado: any) {
    return new Promise((resolve, reject) => {
      let dataWorked: any = [];
      grabado.forEach((element: any, index: number) => {
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
          return dataWorked;
        }
      });
      setTimeout(() => {
        console.log("Procesando archivo... ✍️");
        resolve(dataWorked);
      }, 2800);
    }); //.then(dataWorked => this.composeNewObject(dataWorked));
  }

  public async composeNewObject(dataWorked: any) {
    return new Promise<any[]>((resolve, reject) => {
      let nodos: any[] = dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
      //filesystem.writeFileSync('src/tiras/meanwhile.json',JSON.stringify(nodos,null,2))
      /** 
      //crea el libro de trabajo
      const wb: WorkBook = xlsx.utils.book_new();
      //nombre de la hoja string 
      const ws_name = "transformed";
      //crea la hoja de trabajo
      let ws: WorkSheet = xlsx.utils.json_to_sheet(nodos);
      //junta el libro creado con la hoja 
      xlsx.utils.book_append_sheet(wb, ws, ws_name);
      //escribe el libro en la ruta especifica
      xlsx.writeFile(wb, "src/constructedFile/streamerX4space.xlsx");
      */
      setTimeout(() => {
        console.log("Escribiendo nuevo Json 🚧");
        resolve(nodos);
      }, 2600);
    }).then((nodos)=> this.writeNewJson(nodos))
  }
  public async writeNewJson(nodos:any) {
    const respuesta = await nodos
    console.log(typeof respuesta,"numero de archivos")
    
  }

  //todo Eliminar las conexion de la lectura
  //todo agregar los nuevos paths para la escritura del json
  //todo mejorar la sintaxis de las variables
  //todo intentar escribir despues de eso el excel con el streamer del xlsx
  //todo intentar escribir el excel con el streamer de node
  //todo hacer refactor del codigo y dejaro mas limpioc
  //todo comentar las funciones y sintantic
  public async doitAll(name: string) {
    //!resuelve promesas en serial una seguida de la otra
    const filex: WorkBook = <WorkBook>await this.readFilex(name);
    const constructedWorkSheet: any = await this.constructWorkSheet(filex);
    const newTable = await this.constructNewJson(constructedWorkSheet);
    const newObject = await this.composeNewObject(newTable);
    //const writedJson = await this.writeNewJson(newObject)
    return [filex, constructedWorkSheet, newTable, newObject];
  }
}
