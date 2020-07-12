import { Request, Response } from "express-serve-static-core";
import { FileConverter } from "../callup/FileConverter";
import  fs from "fs";
const fetch = require('node-fetch');
/**
 * *realize all the engine of endpoint  with the information
 * @class FileConverter extract xlsx info and construct s json with information
 * @class Converter call class File converter and take node request
 * @public convert make the calls over @function and wait for the result to go on to the next one
 */

export class Converter {
  constructor() {}

  public async convert(req: Request, res: Response) {
    const promiseFunction = async ()=>{
    const xfile      = req.files;
    const Xfile      = new FileConverter(xfile);
    const moveFile   = await Xfile.moveFile(); //*mueve el archivo a la carpeta de uploads
    const readfile   = await Xfile.readFilex(moveFile.payload); //* lee el archivo de la carpeta uploads 
    const construct  = await Xfile.constructWorkSheet(readfile.payload);//* construye apartir de la hoja de xlsx un arreglo de arreglos AoA
    const nodos      = await Xfile.jsonTreatment(construct.payload); //* limpia el texto del aoa consigue el header para la busqueda y lo guarda 
    const compose    = await Xfile.composeObject(nodos.payload); //* guarda un nuevo objeto creado a partir de las llaves nuevas
    const jsonHeader = await Xfile.createHeader();//* crea un arreglo apartir de el header extraido con las plabaras clave de las nuevas caratulas
    const toDb       = await Xfile.writeTodb(compose.payload)
      try {
         const allPromises = Promise.all([moveFile,readfile,construct,nodos,compose,jsonHeader,toDb])
         .then((responses)=> responses.forEach((response) => console.log(response.message)))
         .then(() => res.status(200).json({message:`all itś being set 👌`}))
         .catch(error => console.log(error,"Una de las promesas ha fallado ❌"))
         console.log("corre la promesas all!! 💀", allPromises)
      } catch (error) {
        res.status(400).json({ message: "Error moviendo el archivo ❌", error });
        console.log(`Error al mover el archivo ❌ ${error}`);
        throw new Error(`Error al mover el archivo ❌ ${error}`);
      }
    }
   promiseFunction()
  } 

   public async  getFile(req:Request,res:Response){
         console.log("hola getfile")
        const file = fs.readFileSync("src/superjson/zordTest01.json",{encoding:"utf-8"})
        res.download(file,"cachitos.json",((error)=>{
            if(error) return res.status(404).json({message:`Algo ha saldo mal ${error}`})

        }))
        //res.attachment("papitas.json")
   }


}
