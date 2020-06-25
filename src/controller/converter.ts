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
    try {
      const xfile = req.files;
      const Xfile = new FileConverter(xfile);
      const moveFile = await Xfile.moveFile();
      const readfile = await Xfile.readFilex(moveFile);
      const construct = await Xfile.constructWorkSheet(readfile);
      await Xfile.jsonTreatment(construct);
      //const header = 
      await Xfile.createHeader()
      Promise.all([moveFile, readfile, construct])
        .then(([moveFile, readfile, construct]) =>
          res.status(200).json({message:`Json saved successfully`
            // moveFile,
            // readfile,
            // construct,
          })
        )
        .catch((error) =>
          res
            .status(400)
            .json({
              message: `Un error en las acciones no ha dejado continuar ${error}`,
            })
        );
    } catch (error) {
      res.status(400).json({ message: "Error moviendo el archivo ❌", error });
      console.log(`Error al mover el archivo ❌ ${error}`);
      throw new Error(`Error al mover el archivo ❌ ${error}`);
    }
  }
}
