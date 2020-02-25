import { Request, Response } from "express-serve-static-core";
import { FileCall } from "../callup/FileCall";
import { WorkSheet, WorkBook } from "xlsx";

/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
 */

export class Converter {
  constructor() {}
  public async convert(req: Request, res: Response) {
    try {
      const xfile = req.files;
      const Xfile = new FileCall();
      Xfile.moveFile(xfile).then((xfileName: string) => {
        Xfile.doitAll(xfileName);
      });
    } catch (error) {
      console.log("Error al mover el archivo ❌");
      res.status(400).json({ message: "Error moviendo el archivo ❌", error });
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
