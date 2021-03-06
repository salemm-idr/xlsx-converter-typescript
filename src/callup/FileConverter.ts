import xlsx, { WorkSheet, WorkBook } from "xlsx";
import fileUpload from "express-fileupload";
import path from "path";
import Sheet from "../models/Sheet"; //lleva la interface
import fs from "fs";
import {Request, Response} from "express"
type UploadedFile = fileUpload.UploadedFile;
const directoryPath = path.resolve("src/uploads");
interface toWrite {
  name: string;
  hojaAoA:(string|number|boolean)[]
  
}
export class FileConverter {
  constructedSearch: [] = [];
  header:[][]= [];
  //header:[]=[];
  dataworked:[]=[]
  workbook:any
  workSheet:WorkSheet = Object;
  xlsxFile:any
  static isUploaded(file: UploadedFile | UploadedFile[]): file is UploadedFile {
    return (
      typeof file === "object" && (file as UploadedFile).name !== undefined
    );
  }

  constructor(xlsxFile:any) {
  this.xlsxFile = xlsxFile
  }
  /**
   *
   * @param xlsx objeto del navegador tipo xlsx
   * @returns xFile.name nombre del archivo
   */
  public async moveFile (){
  return   new Promise<string>((resolve,reject)=>{
      console.log(this.xlsxFile)
      const {file} = this.xlsxFile
      file.mv(`${directoryPath}/${file.name}`, (err:any) => {
        if (err) {
          console.log(err);
          reject(console.error("No se ha movido el archivo ⚠️"));
        } else {setTimeout(()=> {
          console.log(`Moviendo Archivo! ${file.name} 😮`);
          resolve(file.name)
        },1000)}
      });
    })
    /* .then((xfileName:string) => this.readFilex(xfileName))
    .catch((error)=> console.error(error)) */

}
public async readFilex(xfileName:string){
 return new Promise<WorkBook>((resolve,reject)=>{
    const exist = fs.existsSync(`${directoryPath}/${xfileName}`);
    if (!exist) {
      console.log("no existe lo vamos a asignar");
      this.workbook = xlsx.readFile(`${directoryPath}/${xfileName}`, {
        cellDates: true,
      });
      resolve(this.workbook);
    }else {
      this.workbook = xlsx.readFile(`${directoryPath}/${xfileName}`, {
        cellDates: true,
      });
      setTimeout(() => {
        console.log("leyendo el  archivo ✊ enviando a construir 🚧")
        resolve(this.workbook);
      }, 1300);
    }
  })
  /* .then(workbook => this.constructWorkSheet(workbook)) */
  
}

public async  constructWorkSheet(workbook:WorkBook){
    return new Promise<toWrite>((resolve,reject)=>{
      let tabs: string[] = workbook.SheetNames;
      let worksheet: WorkSheet;
      console.log(tabs, "in filecall 👌");
      let daFile = tabs.map((tab) => {
        let toSave = {} as toWrite;
        worksheet = workbook.Sheets[tab];
        console.log(tab, "nombre de la tabla individual 🚀");
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
        this.workSheet = worksheet
      }, 1600);
    })
   
    
}
 
public async jsonTreatment(wrote:toWrite){
  return new Promise<(string|number|boolean)[]>((resolve,reject)=>{
    let  dataWorked:(string|number|boolean)[] =[]

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
        resolve(wrote.hojaAoA.slice(index + 1))
        return dataWorked;
      }else if(!texted){
        reject("no se grabo el arhivo")
      }
    });
     setTimeout(()=>{
        console.log("Tratamiento de json terminado 👌 😏");
        resolve(dataWorked)
      },2000)

  })
  .then((dataworked)=> {
        this.composeObject(dataworked)
      })
  
  .catch((error) => console.log(`No se ha podido leer el parametro de busqueda${error}`)) 
}
  
public async composeObject(dataWorked:any){
   return new Promise<object>((resolve,reject)=>{
    let nodos:{} =  dataWorked.map((nodo:[]) => {
      let xFile= {};
      nodo.forEach((elemento, index) => {
        xFile[this.constructedSearch[index]] = elemento;
      });
      return xFile;
    });
  setTimeout(()=>{
    resolve(nodos)
  },2300) 
  })
  .then((nodos)=> {
    console.log("datos guardados");
     fs.writeFileSync("src/superjson/zordTest08.json",JSON.stringify(nodos,null,2),{flag:"a+"})
  })
  .then(()=> this.createHeader())
  .catch((error) => console.log(`No se puede mapear el dataworked ${error}`)) 
}

  public async writeTodb(nodos:any){
    //fs.writeFileSync("src/superjson/zordTest02.json",JSON.stringify(nodos,null,2))
    console.log(Object.keys(nodos).length)
    return new Promise((resolve,reject) =>{
        nodos.forEach((item:object) => {
         const sheet =   Sheet.create({item});
         //sheet.save(); // este guarda a la base 
       }); 
       resolve()
    }).then(()=> console.log("Guardado a la base listo ✅"))
   
  }

  public async createHeader(){
      return new Promise((resolve, reject) => {
    let faceKey:(string)[] = []
    let hd2:[][] = xlsx.utils.sheet_to_json(this.workSheet, { header: 1 });
    let seccion:[][] = hd2.slice(0, 20);
     seccion.map((row) => {
        if (row.length <= 9) {
          this.header = [...this.header, row];
        }
      });

      this.header.reduce((acc:[][],currValue:[]) => {
        return acc.concat(currValue)
      },[])
      .filter(Boolean)
      .map(item => {
        let tag = item.toString().trim().toUpperCase().split(":")
        //console.log(tag)
        tag.forEach((tag:(string)) =>{
           if(tag === "NOMBRE") return faceKey=[...faceKey,tag]
        if(tag === "DIRECCIÓN")return faceKey=[...faceKey,tag]
        if(tag === "PLATAFORMA")return faceKey=[...faceKey,tag]
        if(tag === "FECHA ACTIVACIÓN") return faceKey=[...faceKey,tag]
        if(tag === "IMSI")return faceKey=[...faceKey,tag]
        if(tag.includes("LÍNEA")===true){
         let splited = tag.split(' ')
         return faceKey=[...faceKey,splited[0]]
        }
        })
      })

      console.log(faceKey,"final fantasy")

      resolve(this.header)
      setTimeout(()=>{
        console.log("Creando el header de Caratula 📂")
          resolve()
      },2800)
    }).then((header)=>  fs.writeFileSync("src/headers/test07.js", JSON.stringify(header,null,2))
    )
  }

} // fin de la clase 
 //todo resolver el tipo de datos para pasar al metodo de guardado de objeto

