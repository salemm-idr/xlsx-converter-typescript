import { Request, Response } from "express-serve-static-core";
import { FileConverter } from "../callup/FileConverter";

/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
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
