import { Request, Response } from "express-serve-static-core";
import { FileConverter } from "../callup/FileConverter";
import { WorkSheet, WorkBook } from "xlsx";
import { promises } from "dns";
import { read } from "fs";

/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
 */

export class Converter {
  constructor() {}
  public async convert(req: Request, res: Response) {
    try {
      const xfile = req.files;
      const Xfile = new FileConverter(xfile)
      const moveFile      = await Xfile.moveFile();
      const readfile      = await Xfile.readFilex(moveFile);
      const construct     = await Xfile.constructWorkSheet(readfile); 
                            await Xfile.jsonTreatment(construct);
                        
     // const composeObj    = await Xfile.composeObject(jsontreatmen)
     // const createHeader  = await Xfile.createHeader()
    /*  .then(resp => res.status(200).json({message:"converter!! 😱"}))
     .catch(error => console.error(error))  */
      //Promise.all([mov]).then(res => console.log("Todo ha terminado"))
      //await  Xfile.moveFile(xfile)
      /* .then(resp => res.status(200).json({message:"Se ha creado un json con la informacion y  construido un header 🐴 ", info:resp}))
      .catch(err => res.status(400).json({message:`algo ha salido mal${err}`})) */
     /*  .then((xfileName:any) => {
        Xfile.doitAll(xfileName)
        .then( reson => res.status(200).json({reson}))
        .catch(err => console.log(err))
      }) */
      Promise.all([
        moveFile,
        readfile,
        construct,
        
        
      ]).then(([
        moveFile,
        readfile,
        construct,
      
        ]) => res.status(200).json({
          moveFile,
          readfile,
          construct,
        
          
        }))
        .catch(error => res.status(400).json({message:`Un error en las acciones no ha dejado continuar ${error}`}))
    } catch (error) {
      res.status(400).json({ message: "Error moviendo el archivo ❌", error });
      console.log(`Error al mover el archivo ❌ ${error}`)
      throw new Error(`Error al mover el archivo ❌ ${error}`)
    }
  }

  // public getJson(req: Request, res: Response) {
  //   try {
  //     const jsoncall = new FileCall();
  //     jsoncall.readJson();
  //   } catch (error) {
  //     console.log("Error al leer el archivo");
  //   }
  // }
}
