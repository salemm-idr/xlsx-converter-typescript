import xlsx, { WorkSheet, WorkBook } from "xlsx";
import fileUpload from "express-fileupload";
import path from "path";
import Sheet, { ISheet } from "../models/Sheet"; //lleva la interface
import fs from "fs";
import {Request, Response} from "express"
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

  constructor() {
  
  }
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
            } else {setTimeout(()=> {
              console.log(`Moviendo Archivo! ${Xfile.name} 😮`);
              resolve(Xfile.name)
            },50)}
          });
        }
      }
    }).then(xfileName => this.readFilex(xfileName))
  }
  /**
   *
   * @param xfileName nombre del archivo movido a la carpeta uploads
   * @return promesa WorkBook
   */
  public async readFilex(xfileName: string) {
    return new Promise<WorkBook>((resolve, reject) => {
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
        setTimeout(() => {
          console.log("leyendo el  archivo ✊ enviando a construir 🚧")
          resolve(this.workbook);
        }, 200);
      }
    }).then(workbook => this.constructWorkSheet(workbook))
  }
  /**
   * @param workbook de libreria xlsx archivo convertido para proceso
   *   construye un workseeht de la lectura a AoA(arreglo de arreglos)
   *  @returns promesa de objeto
   */
  public async constructWorkSheet(workbook: WorkBook) {
    return new Promise<object>((resolve, reject) => {
      setTimeout(() => console.log("construyendo sheet 🕵"), 300);
      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");
      let daFile = tabs.map((tab, index) => {
        let toSave = {} as toWrite;
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        //* llama nueva funcion
        //! this.createHeader(worksheet);
        //* sin azincronia
        let data: (string | number)[] = xlsx.utils.sheet_to_json(worksheet, {
          header: 1,
        });
        toSave.name = tab;
        toSave.hojaAoA = data;
        return toSave;
      });
      setTimeout(() => {
        console.log("termina de construir worksheet ⏬ estableciendo llaves");
        resolve(daFile.shift());
      }, 400);
    }).then(fileObj => this.writeJsonToFolder(fileObj))
  }
  /**
   * @param wrote objecto compuesto de nombre y data de la hoja de xlsx
   * @returns promsa de string
   */
  public async writeJsonToFolder(wrote: any) {
    return new Promise<any>((resolve, reject) => {
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
        }else reject("no se grabo el arhivo")
      });

      let nodos:(string|number|boolean)[] =  dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
    if(nodos){
      fs.writeFileSync("src/superjson/2zord.json",JSON.stringify(nodos))
    }      
      setTimeout(() => {
        console.log("Parametro de header construido ⤴️: 😱");
        //resolve(nodos);
      }, 600);
    }).then((data) => console.log(data,"de la respuesta"))
    .catch(error => console.error(error))
  }
  /**
   * @param this.constructedSearch es el valor creado del header extraido de el AoA
   * para usar como parametro de columnas
   *
   * @param dataWorked data cruda para construir el json que sera un xlsx
   */
  public async composeNewObject(dataWorked: any) {
    return new Promise<object>((resolve, reject) => {
      let nodos: any[] =  dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
      //guarda el objeto compuesto a una carpeta
      fs.writeFileSync("src/superjson/2zord.json",JSON.stringify(nodos))

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
      },700);
    })
  }

  public async createHeader(worksheet: WorkSheet) {
    let hd2 = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    let seccion = hd2.slice(0, 20);
    return new Promise((resolve, reject) => {
      const pre: any = seccion.map((row: any) => {
        if (row.length <= 9) {
          this.header = [...this.header, row];
          fs.writeFileSync("src/headers/test2.js", JSON.stringify(this.header));
        }else reject()
      });
      setTimeout(()=>{
        console.log("Creando el header de Caratula 📂")
          resolve()
      },2800)
    }).then(()=>this.workis(this.header))
  }

  public async workis(seccion: any) {
    console.log("llegando a workis",seccion)
/*     return new Promise((resolve,reject) => {
      let keys:(string)[] = [];
      const flaten = seccion.reduce((acc:string,currentvalue:string) => {
        return acc.concat(currentvalue)
      },[])
      .filter(Boolean)
      .map((item:any) => {
        const tag = item.toString().toUpperCase().trim().spli(':')
          tag.forEach((tag:string) => {
            if(tag === "NOMBRE") return keys=[...keys,tag]
            if(tag === "DIRECCIÓN")return keys=[...keys,tag]
            if(tag === "PLATAFORMA")return keys=[...keys,tag]
            if(tag === "FECHA ACTIVACIÓN") return keys=[...keys,tag]
            if(tag === "IMSI")return keys=[...keys,tag]
            if(tag.includes("LÍNEA")===true){
             let splited = tag.split(' ')
             console.log(keys=[...keys,splited[0]])
             return keys=[...keys,splited[0]]
            }
          });
      })
      resolve(keys)
    }).then(llaves => console.log(llaves)) */
  }
  /**
   *
   * @param name nombre del archivo que inicia la funcion que llama a las principales
   * viene de el archivo de la funcion
   * @class Converter del archivo ./controller/converter
   *
   */
/*   public async doitAll(name: string) {
    const filex: WorkBook = <WorkBook> await this.readFilex(name);
    const constructedWorkSheet: object = await this.constructWorkSheet(filex);
    const writeJson = await this.writeJsonToFolder(constructedWorkSheet);
    //const writeTodb = await this.composeNewObject(writeJson);
    //const writeHeader = await this.createHeader(constructedWorkSheet);
    return [filex, constructedWorkSheet, writeJson];
  }
 */
}
