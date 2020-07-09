import xlsx, { WorkSheet, WorkBook } from "xlsx";
import fileUpload from "express-fileupload";
import path from "path";
import SingleSheet, { ISheet } from "../models/SingleSheet";
import Sheet from "../models/Sheet"; //lleva la interface
import fs,{promises} from "fs";
import { Request, Response } from "express";
type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.resolve("src/uploads");
const jsonPath = path.resolve("src/superjson");
const headerPath = path.resolve("src/headers");
interface toWrite {
  name: string;
  hojaAoA: (string | number | boolean)[];
}
interface Idata {
  message: string;
  payload: any;
}
export class FileConverter {
  constructedSearch: [] = [];
  header: [][] = [];
  //header:[]=[];
  fileJsonName: string = "";
  dataworked: (string | number | boolean)[] = [];
  workbook: any;
  workSheet: WorkSheet = Object;
  xlsxFile: any;
  nodos: [] = [];
  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }

  constructor(xlsxFile: any) {
    this.xlsxFile = xlsxFile;
  }

  /**
   * @param xlsx objeto del navegador tipo xlsx
   * @returns xFile.name nombre del archivo
   */

  public async moveFile() {
    return new Promise<Idata>((resolve, reject) => {
      console.log(this.xlsxFile);
      const { file } = this.xlsxFile;
      file.mv(`${directoryPath}/${file.name}`, (err: any) => {
        if (err) {
          console.log(err);
          reject(console.error("No se ha movido el archivo ⚠️"));
        } else {
          setTimeout(() => {
            console.log(`Moviendo Archivo! ${file.name} 😮`);
            this.fileJsonName = file.name;
            resolve({
              message: "Moviendo Archivo!",
              payload: this.fileJsonName,
            });
          }, 1000);
        }
      });
    });
  }

  /**
   * @parm xfileName target the file name and us it for check acces on fs
   * @var workbook  read the file xlsx and save it to the top level
   *
   */
  public async readFilex(xfileName: string) {
    return new Promise<Idata>((resolve, reject) => {
      const exist = fs.existsSync(`${directoryPath}/${xfileName}`);
      if (exist) {
        console.log("no existe lo vamos a asignar ✋");
        this.workbook = xlsx.readFile(`${directoryPath}/${xfileName}`, {
          cellDates: true,
        });
        setTimeout(() => {
          console.log("Leyendo el  archivo ✊ enviando a construir 🚧");
          resolve({
            message: "Leyendo el archivo para construir",
            payload: this.workbook,
          });
        }, 1500);
      } else {
        this.workbook = xlsx.readFile(`${directoryPath}/${xfileName}`, {
          cellDates: true,
        });
        setTimeout(() => {
          console.log("Leyendo el  archivo ✊ enviando a construir 🚧");
          resolve({
            message: "Leyendo el archivo para construir",
            payload: this.workbook,
          });
        }, 1500);
      }
    });
  }
  /**
   *
   * @param workbook came from await converter call equivalet to xlsx file ready to being treated
   * @var worksheet  store one tab at the time from the xlsx
   */

  public async constructWorkSheet(workbook: WorkBook) {
    return new Promise<Idata>((resolve, reject) => {
      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");
      let daFile = tabs.map((tab) => {
        // let toSave = {} as toWrite;
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
        let data: (string | number)[] = xlsx.utils.sheet_to_json(worksheet, {
          header: 1,blankrows:true,defval:"nodefinida"
        });
        return data;
        /*   toSave.name = tab;
        toSave.hojaAoA = data;
        return toSave; 
        alternative = daFile.shift()
        */
      });
      setTimeout(() => {
        console.log("termina de construir worksheet ⏬ estableciendo llaves");
        resolve({
          message: "termina de construir worksheet ⏬ estableciendo llaves",
          payload: daFile.shift(),
        });
        this.workSheet = worksheet;
      }, 2000);
    });
  }

  /**
   *
   * @param wrote contain all the data from the xlsx in a better formar to javascript proccessing
   * @function jsonTreatment extract from AoA (Array of Arrays) and pass for string proccess
   * @var dataworked grep all the info from being apart
   * @this constructedSearch save the piece of code who be the part for construct new object
   */

  public async jsonTreatment(aoa: []) {
    //<(string | number | boolean)[]>
    return new Promise<Idata>((resolve, reject) => {
      let dataWorked: (string | number | boolean)[] = [];
      aoa.forEach((element: any, index: number) => {
        const texted: any = element.map((innerText: string) => {
          if (typeof innerText === "string") {
            let recortado = innerText
              .toUpperCase()
              .trim()
              .replace(/[t\n\r\s.,]+/g, '')//.replace(/t[\r\n\s.,]+/g, "");
            return recortado;
          }
        });
        if (texted.includes("TELEFONO") === true) {
          this.constructedSearch = texted.map((item:string)=>{
            if(item === "TELEFONO") return item.replace("TELEFONO","MSISDN")
            if(item === "TIPO")return item.replace("TIPO","TYPE")
            if(item === "NUMEROA")return item.replace("NUMEROA","SIDEA")
            if(item === "NUMEROB")return item.replace("NUMEROB","SIDEB")
            if(item === "FECHA")return item.replace("FECHA","STARTDATE")
            if(item === "HORA")return item.replace("HORA","STARTHOUR")
            if(item === "DURACSEG")return item.replace("DURACSEG","DURATION")
            if(item === "IMEI")return item.replace("IMEI","IMEI")
            if(item === "UBICACIONGEOGRAFICA(LATITUDLNG)")return item.replace("UBICACIONGEOGRAFICA(LATITUDLNG)", "LAT")
            if(item === "UBICACIONGEOGRAFICA")return item.replace("UBICACIONGEOGRAFICA","LAT")
            //if(item === "/ LONGITUD)" || "NODEFINIDA")return item.replace("/LONGITUD"||"NODEFINIDA","LNG")
            //if(item === "NODEFINIDA")return item.replace("TIPO","LECHE")
            if(item === "AZIMUTH") return item.replace("AZIMUTH","AZIMUTH")
          })
          console.log(this.constructedSearch)
          this.dataworked = aoa.slice(index + 1);
          console.log(this.dataworked.slice(0, 1));
          //resolve(wrote.hojaAoA.slice(index + 1));
          //return dataWorked;
        } else if (!texted) {
          reject(
            "La Palabra Telefono o TELEFONO no es lejible en el archivo 😪"
          );
        }
      });
      setTimeout(() => {
        console.log("Tratamiento de json terminado 👌 😏");
        resolve({
          message: "Tratamiento de json terminado 👌 😏",
          payload: this.dataworked,
        });
      }, 2500);
    });
    //promise
    // .then((dataworked) => {
    //  this.composeObject(dataworked);
    // })
    // .catch((error) =>
    //   console.log(`No se ha podido leer el parametro de busqueda${error}`)
    // );
  }
  /**
   *
   * @param dataWorked ready for being proccessig searching for a doble nested array and make a fusion to consruct new object
   * @var nodos now carry on all the merged JSON with columns an row from the xlsx depurated and clean
   * @resolve nodos to return the Promise with the new json
   * @then take the las resolve JSON an write to fs the new object
   * @then this.createHeader call for the function
   */
  public async composeObject(dataWorked: any) {
    return new Promise<Idata>((resolve, reject) => {
      let nodos: [] = dataWorked.map((nodo: []) => {
        let xFile = {};
        nodo.forEach((elemento, index) => {
          xFile[this.constructedSearch[index]] = elemento;
        });
        return xFile;
      });
      const exist = fs.existsSync(`${jsonPath}/${this.fileJsonName.split(".")[0]}.json`)
      if (exist) {
        console.log("no existe vamos a grabarlo ✋");
        fs.writeFileSync(
          `${jsonPath}/${this.fileJsonName.split(".")[0]}.json`,
          JSON.stringify(nodos, null, 2),
          { flag: "a+" }
        );
        setTimeout(() => {
          resolve({
            message:
              "Se ha guardado un nuevo objeto al sistema de archivos 📨 ",
            payload: nodos,
          });
        }, 3000);
      } else {
        console.log("Sigamos adelante 👉");
        fs.writeFileSync(
          `${jsonPath}/${this.fileJsonName.split(".")[0]}.json`,
          JSON.stringify(nodos, null, 2),
          { flag: "a+" }
        );
        setTimeout(() => {
          resolve({
            message:
              "Se ha guardado un nuevo objeto al sistema de archivos 📨 ",
            payload: nodos,
          });
        }, 3000);
      }
    });//end of the promise
  }

  /**
   * @var faceKey contain a new array of strings extracted for the previous xlsx createing a header for a better search and data manipulation
   * @var hd2 treat @var worksheet createing a new AoA(Array of Arrays)
   * @var seccion extract just the first 20 ocurence for the xlsx  map it and fill the @this.header
   * @this header finally being proccess with tge triforce .reduce().filter().map() for search keywords
   * @resolve to exit promes
   * @then write the new file in one array with keywords
   */
  public async createHeader() {
    return new Promise<Idata>((resolve, reject) => {
      let faceKey: string[] = [];
      let hd2: [][] = xlsx.utils.sheet_to_json(this.workSheet, { header: 1 });
      const exist = fs.existsSync(`${headerPath}/${this.fileJsonName.split(".")[0]}Header.js`)
      let seccion: [][] = hd2.slice(0, 20);
      seccion.map((row) => {
        if (row.length <= 9) {
          this.header = [...this.header, row];
        }
      });
      this.header
        .reduce((acc: [][], currValue: []) => {
          return acc.concat(currValue);
        }, [])
        .filter(Boolean)
        .map((item) => {
          let tag = item.toString().trim().toUpperCase().split(":");
          //console.log(tag)
          tag.forEach((tag: string) => {
            if (tag === "NOMBRE") return (faceKey = [...faceKey, tag]);
            if (tag === "DIRECCIÓN") return (faceKey = [...faceKey, tag]);
            if (tag === "PLATAFORMA") return (faceKey = [...faceKey, tag]);
            if (tag === "FECHA ACTIVACIÓN")
              return (faceKey = [...faceKey, tag]);
            if (tag === "IMSI") return (faceKey = [...faceKey, tag]);
            if (tag.includes("LÍNEA") === true) {
              let splited = tag.split(" ");
              return (faceKey = [...faceKey, splited[0]]);
            }
          });
        });
      console.log(faceKey, "final fantasy");
        if(exist){
          console.log("no existe vamos a grabarlo ✋");
          fs.writeFileSync(
            `${headerPath}/${this.fileJsonName.split(".")[0]}Header.js`,
            JSON.stringify({...this.header,faceKey}, null, 2)
          );
          setTimeout(() => {
            resolve({
              message: "Se ha creado un header de palabras clave para Caratula 📂",
              payload: this.header,
            });
          }, 3500);
        }else{
          fs.writeFileSync(
            `${headerPath}/${this.fileJsonName.split(".")[0]}Header.js`,
            JSON.stringify({...this.header,faceKey}, null, 2)
          );
          setTimeout(() => {
            resolve({
              message: "Se ha creado un header de palabras clave para Caratula 📂",
              payload: this.header,
            });
          }, 3500);
        }
     
    }); 
  }

  /**
   *
   * @param nodos came from promes of composeObject ready to grep an save to the database
   */

  public async writeTodb(nodos:any) {
     return new Promise<Idata>((resolve, reject) => {
      let pice = nodos.slice(0,10);
      console.log(pice,"si estamos aca ")
    /*   pice.forEach((item: ISheet) => {
        const sheet = SingleSheet.create({item:item});
      });  */
      //!version de objeto por objeto 
      const bigSheet = SingleSheet.create({item:pice})
      console.log(bigSheet,"not to risk at all!!")
      //! version de hoja completa por objetos arroja un arreglo de objetos en el documento 
      setTimeout(()=>{
          resolve({message:"Guardado a la base listo ✅",payload:true})
      },4000)
    }) 
  }
} //end of class
