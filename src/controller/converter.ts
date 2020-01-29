import { Request, Response, NextFunction } from "express-serve-static-core";
import fileUpload from "express-fileupload";
import { FileCall } from "../callup/FileCall";
type UploadedFile = fileUpload.UploadedFile;
import { WorkSheet, WorkBook } from "xlsx";

/**
 * *realize all the engine of endpoint  with the information
 * TODO revisar la asincronia revisar si se debe crear una nueva serie de clase para los metodos y que devuelvan un valor
 */

interface dataUtils {
  name: string;
  file: object;
}
export class Converter {
  //filex: WorkBook = <WorkBook>{};
  constructor() {}

  public async convert(req: Request, res: Response, next: NextFunction) {
    try {
      const xfile = req.files;
      FileCall.moveFile(xfile)
        .then((xfileName: string) => {
          Converter.todoAll(xfileName);
        })
        .then(response => {
          res
            .status(200)
            .json({ message: "Se ha cargado con exito el archivo" });
        });
    } catch (error) {
      console.log("Error al mover el archivo");
      res.status(400).json({ message: "Error moviendo el archivo", error });
    }
  }

  static async todoAll(xfileName: string) {
    //*paso 1 leer el archivo desde FileCall y regresar el valor
    const filex: WorkBook = <WorkBook>await FileCall.readFilex(xfileName);
    //*paso 2  enviar el filex a constructedWorkSheet y regresar el valor
    const constructedWorkSheet: WorkSheet = await FileCall.constructWorkSheet(
      filex
    );
    // const composedToJson = await FileCall.writeJsonToFolder(
    //   constructedWorkSheet
    // );
  }
}
