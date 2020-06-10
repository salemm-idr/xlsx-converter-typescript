import xlsx, { WorkSheet, WorkBook } from "xlsx";
import fileUpload from "express-fileupload";
import path from "path";
import Sheet, { ISheet } from "../models/Sheet"; //lleva la interface
import fs from "fs";
type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.resolve("src/uploads");
interface toWrite {
  name: string;
  hojaAoA: unknown[];
}
export class FileCall {
  constructedSearch: [] = [];
  header: (string | number | undefined)[] = [];
  //header:[]=[];
  workbook: any;
  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }

  constructor() {}
  /**
   *
   * @param xfile objeto del navegador tipo xlsx
   * @returns xFile.name nombre del archivo
   */
  public async moveFile(xfile: any | object) {
    return new Promise<string>((resolve, reject) => {
      setTimeout(() => console.log("moviendo archivo"), 200);
      if (typeof xfile === "object") {
        let Xfile = xfile.file;
        console.log(Xfile);
        if (FileCall.isUploaded(Xfile)) {
          Xfile.mv(`${directoryPath}/${Xfile.name}`, (err) => {
            if (err) {
              console.log(err);
              reject(new Error("No se ha movido el archivo ⚠️"));
            } else resolve(Xfile.name);
          });
        }
      }
    });
  }
  /**
   *
   * @param xfileName nombre del archivo movido a la carpeta uploads
   * @return promesa WorkBook
   */
  public async readFilex(xfileName: string) {
    return new Promise<WorkBook>((resolve, reject) => {
      setTimeout(() => console.log("leyendo el  archivo ✊"), 200);
      console.log(xfileName, "en readfilex   🔧");
      const exist = fs.existsSync(`${directoryPath}/${xfileName}`);
      if (!exist) {
        console.log("no existe lo vamos a asignar");
        this.workbook = xlsx.readFile(`${directoryPath}/${xfileName}`, {
          cellDates: true,
        });
        resolve(this.workbook);
      } else {
        this.workbook = xlsx.readFile(`${directoryPath}/${xfileName}`, {
          cellDates: true,
        });
        resolve(this.workbook);
      }
      // if (workbook === undefined) {
      //   reject(new Error("no pueod leer el archivo"));
      // } else resolve(workbook);
    }).then();
  }
  /**
   * @param workbook de libreria xlsx archivo convertido para proceso
   *   construye un workseeht de la lectura a AoA(arreglo de arreglos)
   *  @returns promesa de objeto
   */
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
        //* llama nueva funcion
        this.createHeader(worksheet);
        //* sin azincronia
        let data: (string | number)[] = xlsx.utils.sheet_to_json(worksheet, {
          header: 1,
        });
        toSave.name = tab;
        toSave.hojaAoA = data;
        return toSave;
      });
      setTimeout(() => {
        console.log("termina de construir worksheet ⏬");
        resolve(daFile.shift());
      }, 2800);
    });
  }
  /**
   * @param wrote objecto compuesto de nombre y data de la hoja de xlsx
   * @returns promsa de string
   */
  public async writeJsonToFolder(wrote: any) {
    return new Promise<string>((resolve, reject) => {
      let dataWorked: any = [];
      wrote.hojaAoA.forEach((element: any, index: number) => {
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
          dataWorked = wrote.hojaAoA.slice(index + 1);
          return dataWorked;
        }
      });
      setTimeout(() => {
        console.log("Parametro de header construido ⤴️");
        resolve(dataWorked);
      }, 2700);
    }).then((dataWorked) => this.composeNewObject(dataWorked));
  }
  /**
   * @param this.constructedSearch es el valor creado del header extraido de el AoA
   * para usar como parametro de columnas
   *
   * @param dataWorked data cruda para construir el json que sera un xlsx
   */
  public async composeNewObject(dataWorked: any) {
    return new Promise<object>((resolve, reject) => {
      let nodos: any[] = dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
      //console.log("nuevos nodos", nodos.slice(0,5))
      nodos.forEach((item) => {
        const sheet: ISheet = new Sheet({
          item,
        });
        //sheet.save(); este guarda a la base
      });
      setTimeout(() => {
        console.log("Armando json de escritura y guardando a la base 🚧");
        resolve();
      }, (process.exit(0), 2600));
    });
  }

  public createHeader(worksheet: WorkSheet) {
    //!test
    let hd = xlsx.utils.sheet_to_csv(worksheet);
    let hd2 = xlsx.utils.sheet_to_json(worksheet);
     console.log(hd2.slice(0,20))
    //console.log(hd.slice(0,500))
    //fs.writeFileSync("src/arrayof/test6.cvs",JSON.stringify(hd.slice(0,500)))
 /*    let superString = hd.slice(0,500).toUpperCase().trim().replace(/t\r\n\s+/g, "")
    let n = superString.indexOf("TELEFONO")
    if(superString.includes("TELEFONO")=== true){
        console.log(superString.substr(0,n))
    } */
    //let seccion = hd.slice(0, 10);
    //console.log(seccion)
  /*   seccion.map((row: any, i: number) => {
      if (row.length <= 9) {
        this.header = [...this.header, row];
        console.log(this.header,"construido")
        fs.writeFileSync("src/arrayof/test5.js",JSON.stringify(this.header))
      }
    }); */
    this.workis()
    //!test
  }
  public workis(){
    this.header.map((item:any) => {
      console.log(item.from())
    })
  }
  /**
   *
   * @param name nombre del archivo que inicia la funcion que llama a las principales
   * viene de el archivo de la funcion
   * @class Converter del archivo ./controller/converter
   *
   */
  public async doitAll(name: string) {
    const filex: WorkBook = <WorkBook>await this.readFilex(name);
    const constructedWorkSheet: object = await this.constructWorkSheet(filex);
    const writeJson = await this.writeJsonToFolder(constructedWorkSheet);
    return [filex, constructedWorkSheet, writeJson];
  }
}
