import { Request, Response } from "express-serve-static-core";
import { FileConverter } from "../callup/FileConverter";

/**
 * *realize all the engine of endpoint  with the information
 * @class FileConverter extract xlsx info and construct s json with information
 * @class Converter call class File converter and take node request
 * @public convert make the calls over @function and wait for the result to go on to the next one
 */

export class Converter {
  constructor() {}

  public async convert(req: Request, res: Response) {
    const xfile = req.files;
    const Xfile = new FileConverter(xfile);
    const moveFile = await Xfile.moveFile();
    const readfile = await Xfile.readFilex(moveFile);
    const construct = await Xfile.constructWorkSheet(readfile);
    const nodos =  await Xfile.jsonTreatment(construct);
    //const compose  = await Xfile.composeObject(nodos)
    const nuObj = await Xfile.createHeader();
    try {
   const resultado = await Promise.all([moveFile, readfile,nodos])
        .then((results) =>  
         res
        .status(200)
        .json({fileMoved:moveFile,message:`Json saved successfully`}) 
    )
        .catch((error) =>
          res
            .status(400)
            .json({
              message: `Un error en las acciones no ha dejado continuar ${error}`,
            })
        );   
        console.log(resultado)
    } catch (error) {
      res.status(400).json({ message: "Error moviendo el archivo ❌", error });
      console.log(`Error al mover el archivo ❌ ${error}`);
      throw new Error(`Error al mover el archivo ❌ ${error}`);
    }
  }
}
